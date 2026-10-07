/**
 * O'zbekiston telefon raqami: +998 XX XXX XX XX
 */
export const PHONE_PREFIX = '+998 '

/** Foydalanuvchi kiritgan qiymatdan 9 ta milliy raqamni ajratadi */
export function extractDigits(value) {
  let digits = String(value || '').replace(/\D/g, '')
  if (digits.startsWith('998')) digits = digits.slice(3)
  return digits.slice(0, 9)
}

/** 9 ta raqamni +998 XX XXX XX XX ko'rinishiga keltiradi */
export function formatPhone(digits) {
  const d = extractDigits(digits)
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean)
  return PHONE_PREFIX + parts.join(' ')
}

/** To'liq raqam: +998XXXXXXXXX */
export function toE164(value) {
  const d = extractDigits(value)
  return d.length === 9 ? `+998${d}` : ''
}

/** O'zbekiston mobil va shahar operator kodlari */
const VALID_CODES = ['20', '33', '50', '55', '61', '62', '65', '66', '67', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '87', '88', '90', '91', '93', '94', '95', '97', '98', '99']

export function validatePhone(value) {
  const d = extractDigits(value)
  if (!d.length) return 'Телефон рақамингизни киритинг'
  if (d.length < 9) return 'Рақам тўлиқ эмас: +998 __ ___ __ __'
  if (!VALID_CODES.includes(d.slice(0, 2))) return 'Оператор коди нотўғри (масалан: 90, 91, 93, 94, 97, 99, 33, 88)'
  return ''
}
