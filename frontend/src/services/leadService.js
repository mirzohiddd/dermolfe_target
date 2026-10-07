/**
 * Ariza (lead) yuborish servisi.
 *
 * Forma arizani o'zimizning serverga yuboradi: POST /api/leads
 * Backend (dermolife/backend) arizani saqlaydi va Telegram bot orqali guruhga jo'natadi.
 * Bot token faqat serverda turadi — brauzerga hech qachon chiqmaydi.
 *
 * Boshqa domendagi API ishlatilsa: .env da VITE_LEAD_API_URL ni belgilang.
 */
const API_URL = import.meta.env.VITE_LEAD_API_URL || '/api/leads'

export class LeadError extends Error {}

/**
 * @param {{ name: string, problem: string, problemLabel: string, phone: string }} lead
 * @returns {Promise<{ ok: true }>}
 */
export async function submitLead(lead) {
  const payload = {
    ...lead,
    page: typeof window !== 'undefined' ? window.location.href : '',
    utm: readUtm(),
    website: lead.website || '',
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 15000)

  let response
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
  } catch {
    throw new LeadError('Интернет алоқасини текшириб, қайта уриниб кўринг.')
  } finally {
    clearTimeout(timer)
  }

  let data = null
  try {
    data = await response.json()
  } catch {
    /* javob JSON emas */
  }

  if (!response.ok || !data?.ok) {
    throw new LeadError(data?.message || 'Аризани юборишда хатолик юз берди. Илтимос, қайта уриниб кўринг.')
  }
  return { ok: true }
}

/** Target reklamadan kelgan UTM parametrlarini o'qiydi */
function readUtm() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']
  return Object.fromEntries(keys.filter((k) => params.has(k)).map((k) => [k, params.get(k).slice(0, 200)]))
}
