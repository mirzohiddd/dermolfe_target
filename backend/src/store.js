/**
 * Arizalarni JSON faylda saqlash (data/leads.json).
 * Ma'lumotlar bazasiz ishlaydi; kerak bo'lsa keyinchalik DB ga almashtirish oson.
 */
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises'
import path from 'node:path'
import { config } from './config.js'

const FILE = path.join(config.dataDir, 'leads.json')
let leads = []
let queue = Promise.resolve()

export async function initStore() {
  await mkdir(config.dataDir, { recursive: true })
  try {
    leads = JSON.parse(await readFile(FILE, 'utf8'))
    if (!Array.isArray(leads)) leads = []
  } catch {
    leads = []
  }
}

function persist() {
  // ketma-ket va atomar yozish
  queue = queue.then(async () => {
    const tmp = `${FILE}.tmp`
    await writeFile(tmp, JSON.stringify(leads, null, 2))
    await rename(tmp, FILE)
  })
  return queue
}

export async function addLead(data) {
  const id = (leads.at(-1)?.id || 0) + 1
  const lead = { id, ...data, createdAt: new Date().toISOString(), telegram: 'pending' }
  leads.push(lead)
  await persist()
  return lead
}

export async function updateLead(id, patch) {
  const lead = leads.find((l) => l.id === id)
  if (!lead) return
  Object.assign(lead, patch)
  await persist()
}

export function findRecentByPhone(phone, ms) {
  const since = Date.now() - ms
  return leads.findLast((l) => l.phone === phone && Date.parse(l.createdAt) > since)
}

export const allLeads = () => leads
