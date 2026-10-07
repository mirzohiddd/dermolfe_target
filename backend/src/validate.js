/** Server tomonda arizani tekshirish (frontend bilan bir xil qoidalar) */
export const PROBLEMS = {
  psoriaz: 'Псориаз',
  ekzema: 'Экзема',
  'allergik-toshma': 'Аллергик тошмалар',
  'qizarish-quruqlik': 'Қаттиқ қизариш ва қуруқлик',
  'stress-toshma': 'Стресс оқибатидаги тошмалар',
  yalliglanish: 'Теридаги яллиғланиш',
  boshqa: 'Бошқа муаммо',
}

const CODES = new Set(['20', '33', '50', '55', '61', '62', '65', '66', '67', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '87', '88', '90', '91', '93', '94', '95', '97', '98', '99'])

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export function validateLead(body = {}) {
  const name = str(body.name, 60).replace(/\s+/g, ' ')
  const problem = str(body.problem, 40)
  const phone = str(body.phone, 20).replace(/[^\d+]/g, '')

  const errors = {}
  if (name.length < 2 || !/^[\p{L}\s'‘’ʻʼ`-]+$/u.test(name)) errors.name = 'Исм нотўғри'
  if (!PROBLEMS[problem]) errors.problem = 'Муаммо танланмаган'
  if (!/^\+998\d{9}$/.test(phone) || !CODES.has(phone.slice(4, 6))) errors.phone = 'Телефон рақам нотўғри'

  const utm = {}
  if (body.utm && typeof body.utm === 'object') {
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid']) {
      const v = str(body.utm[k], 200)
      if (v) utm[k] = v
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    lead: {
      name,
      problem,
      problemLabel: PROBLEMS[problem] || '',
      phone,
      page: str(body.page, 500),
      utm,
    },
    isBot: Boolean(str(body.website, 100)),
  }
}
