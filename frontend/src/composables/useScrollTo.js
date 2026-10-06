export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Formaga scroll qiladi va ism maydoniga fokus beradi */
export function scrollToForm() {
  scrollToSection('ariza')
  window.setTimeout(() => {
    const input = document.getElementById('lead-name')
    input?.focus({ preventScroll: true })
  }, 650)
}
