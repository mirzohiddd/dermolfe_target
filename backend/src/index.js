/**
 * Dermolife server
 *  - POST /api/leads   — saytdagi formadan ariza qabul qiladi, saqlaydi va Telegram guruhga yuboradi
 *  - GET  /api/health  — server holati
 *  - frontend/dist      — mavjud bo'lsa sayt ham shu server orqali beriladi (ixtiyoriy)
 */
import express from 'express'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { config, checkConfig } from './config.js'
import { initStore, addLead, updateLead, findRecentByPhone } from './store.js'
import { validateLead } from './validate.js'
import { deliverLead, startPolling, isConfigured } from './telegram.js'

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1) // nginx ortida to'g'ri IP uchun

/* ---------- CORS (frontend boshqa domenda bo'lsa) ---------- */
app.use('/api', (req, res, next) => {
  const origin = req.get('origin')
  if (origin && (config.corsOrigins.includes('*') || config.corsOrigins.includes(origin))) {
    res.set('Access-Control-Allow-Origin', origin)
    res.set('Vary', 'Origin')
    res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.set('Access-Control-Max-Age', '86400')
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

/* ---------- oddiy rate limit (IP bo'yicha: 10 daqiqada 5 ta ariza) ---------- */
const hits = new Map()
function rateLimit(req, res, next) {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000
  const list = (hits.get(req.ip) || []).filter((t) => now - t < windowMs)
  if (list.length >= 5) {
    return res.status(429).json({ ok: false, message: 'Juda ko‘p urinish. Birozdan so‘ng qayta urinib ko‘ring.' })
  }
  list.push(now)
  hits.set(req.ip, list)
  next()
}
setInterval(() => {
  const now = Date.now()
  for (const [ip, list] of hits) if (list.every((t) => now - t > 10 * 60 * 1000)) hits.delete(ip)
}, 60 * 1000).unref()

/* ---------- API ---------- */
app.post('/api/leads', express.json({ limit: '10kb' }), rateLimit, async (req, res) => {
  const { ok, errors, lead, isBot } = validateLead(req.body)

  if (isBot) return res.json({ ok: true }) // honeypot — botga "muvaffaqiyat" deymiz, lekin saqlamaymiz
  if (!ok) {
    return res.status(422).json({ ok: false, message: 'Ma’lumotlarni tekshirib, qayta yuboring.', errors })
  }

  // 5 daqiqa ichida shu raqamdan takroriy ariza — qayta yubormaymiz
  if (findRecentByPhone(lead.phone, 5 * 60 * 1000)) return res.json({ ok: true, duplicate: true })

  try {
    const saved = await addLead({ ...lead, ip: req.ip, userAgent: String(req.get('user-agent') || '').slice(0, 300) })
    res.json({ ok: true, id: saved.id })

    // Telegramga javobdan keyin yuboriladi — foydalanuvchi kutib qolmaydi
    if (isConfigured() && config.groupId) {
      const status = await deliverLead(saved)
      await updateLead(saved.id, { telegram: status })
    } else {
      await updateLead(saved.id, { telegram: 'not-configured' })
    }
  } catch (err) {
    console.error('[leads] xatolik:', err)
    if (!res.headersSent) res.status(500).json({ ok: false, message: 'Serverda xatolik. Iltimos, qayta urinib ko‘ring.' })
  }
})

app.get('/api/health', (_req, res) => res.json({ ok: true, telegram: isConfigured() }))
app.use('/api', (_req, res) => res.status(404).json({ ok: false, message: 'Not found' }))

/* ---------- sayt (frontend build mavjud bo'lsa) ---------- */
if (existsSync(config.distDir)) {
  app.use(
    '/assets',
    express.static(path.join(config.distDir, 'assets'), { immutable: true, maxAge: '1y' }),
  )
  app.use(express.static(config.distDir, { maxAge: '1h' }))
  app.get('*', (_req, res) => res.sendFile(path.join(config.distDir, 'index.html')))
}

/* ---------- start ---------- */
await initStore()

const missing = checkConfig()
if (missing.length) {
  console.warn(`⚠️  .env da quyidagilar to‘ldirilmagan: ${missing.join(', ')}`)
  console.warn('   Arizalar data/leads.json ga saqlanadi, lekin Telegramga yuborilmaydi.')
}

app.listen(config.port, () => {
  console.log(`✅ Dermolife server: http://localhost:${config.port}`)
})

startPolling()
