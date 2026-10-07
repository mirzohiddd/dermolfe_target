/**
 * Telegram bot: arizalarni guruhga yuborish + admin komandalari.
 *
 * Komandalar:
 *   /start  — bot haqida
 *   /id     — joriy chat ID sini ko'rsatadi (guruh ID sini bilish uchun)
 *   /stats  — statistika (faqat admin)
 *   /last   — oxirgi 10 ta ariza (faqat admin)
 *   /export — barcha arizalar CSV fayl (faqat admin)
 */
import { config } from './config.js'
import { allLeads } from './store.js'

const api = (method) => `${config.telegramApi}/bot${config.botToken}/${method}`

export const isConfigured = () => Boolean(config.botToken)

async function call(method, payload, { timeoutMs = 15000 } = {}) {
  const res = await fetch(api(method), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(timeoutMs),
  })
  const data = await res.json().catch(() => ({}))
  if (!data.ok) {
    const err = new Error(`Telegram ${method}: ${data.description || res.status}`)
    err.code = data.error_code
    throw err
  }
  return data.result
}

export const sendMessage = (chatId, text, extra = {}) =>
  call('sendMessage', { chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true, ...extra })

/* ---------------- formatlash ---------------- */

export const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const fmtPhone = (p) => p.replace(/^\+998(\d{2})(\d{3})(\d{2})(\d{2})$/, '+998 $1 $2 $3 $4')

const fmtDate = (iso) =>
  new Intl.DateTimeFormat('ru-RU', {
    timeZone: config.timezone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))

export function leadMessage(lead) {
  const lines = [
    `🆕 <b>Янги ариза #${lead.id}</b>`,
    '',
    `👤 <b>Исм:</b> ${esc(lead.name)}`,
    `📞 <b>Телефон:</b> <a href="tel:${lead.phone}">${fmtPhone(lead.phone)}</a>`,
    `🩺 <b>Муаммо:</b> ${esc(lead.problemLabel)}`,
    `🕒 <b>Вақт:</b> ${fmtDate(lead.createdAt)}`,
  ]
  const utm = Object.entries(lead.utm || {})
  if (utm.length) {
    lines.push('', '📊 <b>Манба:</b>')
    for (const [k, v] of utm) lines.push(`• ${esc(k)}: <code>${esc(v)}</code>`)
  }
  return lines.join('\n')
}

/** Arizani guruhga yuboradi. Guruhga ketmasa — adminlarga yuboradi. */
export async function deliverLead(lead) {
  const text = leadMessage(lead)
  try {
    await sendMessage(config.groupId, text)
    return 'sent'
  } catch (err) {
    console.error('[telegram] guruhga yuborilmadi:', err.message)
    const warn = `⚠️ Ариза гуруҳга юборилмади: <code>${esc(err.message)}</code>\n\n${text}`
    for (const admin of config.adminIds) {
      await sendMessage(admin, warn).catch((e) => console.error('[telegram] adminga ham yuborilmadi:', e.message))
    }
    return 'failed'
  }
}

/* ---------------- komandalar ---------------- */

const isAdmin = (userId) => config.adminIds.includes(String(userId))

function stats() {
  const leads = allLeads()
  const dayKey = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: config.timezone }).format(new Date(d))
  const today = dayKey(Date.now())
  const weekAgo = Date.now() - 7 * 864e5
  const byProblem = {}
  for (const l of leads) byProblem[l.problemLabel] = (byProblem[l.problemLabel] || 0) + 1

  const lines = [
    '📈 <b>Статистика</b>',
    '',
    `Бугун: <b>${leads.filter((l) => dayKey(l.createdAt) === today).length}</b>`,
    `Охирги 7 кун: <b>${leads.filter((l) => Date.parse(l.createdAt) > weekAgo).length}</b>`,
    `Жами: <b>${leads.length}</b>`,
  ]
  const top = Object.entries(byProblem).sort((a, b) => b[1] - a[1])
  if (top.length) {
    lines.push('', '<b>Муаммолар бўйича:</b>')
    for (const [k, v] of top) lines.push(`• ${esc(k)} — ${v}`)
  }
  return lines.join('\n')
}

function lastLeads() {
  const items = allLeads().slice(-10).reverse()
  if (!items.length) return 'Ҳозирча аризалар йўқ.'
  return [
    '🗂 <b>Охирги аризалар</b>',
    '',
    ...items.map((l) => `#${l.id} · ${esc(l.name)} · ${fmtPhone(l.phone)} · ${esc(l.problemLabel)} · ${fmtDate(l.createdAt)}`),
  ].join('\n')
}

function toCsv() {
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const head = ['ID', 'Исм', 'Телефон', 'Муаммо', 'Сана', 'utm_source', 'utm_campaign', 'utm_content', 'Telegram']
  const rows = allLeads().map((l) =>
    [l.id, l.name, l.phone, l.problemLabel, fmtDate(l.createdAt), l.utm?.utm_source, l.utm?.utm_campaign, l.utm?.utm_content, l.telegram]
      .map(cell)
      .join(';'),
  )
  return '﻿' + [head.map(cell).join(';'), ...rows].join('\r\n')
}

async function sendCsv(chatId) {
  const form = new FormData()
  form.append('chat_id', String(chatId))
  form.append('caption', `Жами аризалар: ${allLeads().length}`)
  const name = `dermolife-arizalar-${new Date().toISOString().slice(0, 10)}.csv`
  form.append('document', new Blob([toCsv()], { type: 'text/csv' }), name)
  const res = await fetch(api('sendDocument'), { method: 'POST', body: form, signal: AbortSignal.timeout(30000) })
  const data = await res.json().catch(() => ({}))
  if (!data.ok) throw new Error(data.description || 'sendDocument xatosi')
}

async function handleMessage(msg) {
  const text = (msg.text || '').trim()
  if (!text.startsWith('/')) return
  const command = text.split(/\s+/)[0].split('@')[0].toLowerCase()
  const chatId = msg.chat.id
  const admin = isAdmin(msg.from?.id)

  switch (command) {
    case '/start':
      return sendMessage(
        chatId,
        admin
          ? '👋 <b>Dermolife аризалар боти</b>\n\nСайтдаги барча аризалар автоматик гуруҳга юборилади.\n\n/stats — статистика\n/last — охирги 10 та ариза\n/export — барча аризалар (CSV)\n/id — чат ID'
          : 'Ассалому алайкум! Бу бот Dermolife сайтидаги аризаларни қабул қилади.',
      )
    case '/id':
      return sendMessage(
        chatId,
        `Чат ID: <code>${chatId}</code>\nСизнинг ID: <code>${msg.from?.id ?? '-'}</code>`,
      )
    case '/stats':
      return admin && sendMessage(chatId, stats())
    case '/last':
      return admin && sendMessage(chatId, lastLeads())
    case '/export':
      return admin && sendCsv(chatId)
    default:
      return undefined
  }
}

/** Long polling — webhook va alohida domen talab qilinmaydi */
export async function startPolling() {
  if (!isConfigured() || !config.botPolling) return
  try {
    await call('deleteWebhook', { drop_pending_updates: false })
    const me = await call('getMe', {})
    console.log(`[telegram] bot ishga tushdi: @${me.username}`)
    await call('setMyCommands', {
      commands: [
        { command: 'stats', description: 'Статистика' },
        { command: 'last', description: 'Охирги 10 та ариза' },
        { command: 'export', description: 'Аризалар (CSV)' },
        { command: 'id', description: 'Chat ID' },
      ],
    }).catch(() => {})
  } catch (err) {
    console.error('[telegram] botga ulanib bo‘lmadi:', err.message)
  }

  let offset = 0
  let delay = 1000
  for (;;) {
    try {
      const updates = await call(
        'getUpdates',
        { offset, timeout: 50, allowed_updates: ['message'] },
        { timeoutMs: 60000 },
      )
      delay = 1000
      for (const u of updates) {
        offset = u.update_id + 1
        if (u.message) handleMessage(u.message).catch((e) => console.error('[telegram] komanda xatosi:', e.message))
      }
    } catch (err) {
      if (err.code === 401) {
        console.error('[telegram] TELEGRAM_BOT_TOKEN noto‘g‘ri — polling to‘xtatildi')
        return
      }
      console.error('[telegram] polling xatosi:', err.message)
      await new Promise((r) => setTimeout(r, delay))
      delay = Math.min(delay * 2, 30000)
    }
  }
}
