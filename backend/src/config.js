/**
 * Server sozlamalari — .env faylidan o'qiladi.
 */
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const envFile = path.join(ROOT, '.env')
if (existsSync(envFile)) process.loadEnvFile(envFile)

const list = (v) =>
  String(v || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

export const config = {
  port: Number(process.env.PORT) || 3000,
  botToken: (process.env.TELEGRAM_BOT_TOKEN || '').trim(),
  groupId: (process.env.TELEGRAM_GROUP_ID || '').trim(),
  adminIds: list(process.env.TELEGRAM_ADMIN_ID),
  /** Telegram API manzili (faqat test uchun o'zgartiriladi) */
  telegramApi: (process.env.TELEGRAM_API_BASE || 'https://api.telegram.org').replace(/\/$/, ''),
  /** Bot komandalarini tinglash (polling). false bo'lsa bot faqat xabar yuboradi. */
  botPolling: process.env.BOT_POLLING !== 'false',
  dataDir: path.join(ROOT, 'data'),
  /** Frontend build papkasi. Mavjud bo'lsa backend saytni ham beradi (ixtiyoriy). */
  distDir: path.resolve(ROOT, process.env.FRONTEND_DIST || '../frontend/dist'),
  /** Frontend boshqa domenda bo'lsa — ruxsat berilgan manzillar (vergul bilan) */
  corsOrigins: list(process.env.CORS_ORIGIN),
  timezone: 'Asia/Tashkent',
}

export function checkConfig() {
  const missing = []
  if (!config.botToken) missing.push('TELEGRAM_BOT_TOKEN')
  if (!config.groupId) missing.push('TELEGRAM_GROUP_ID')
  if (!config.adminIds.length) missing.push('TELEGRAM_ADMIN_ID')
  return missing
}
