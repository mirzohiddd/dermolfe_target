/**
 * Dermolife sayt sozlamalari — kontaktlar va mutaxassis ma'lumotlari.
 *
 * Bo'sh qoldirilgan maydonlar saytda avtomatik ko'rsatilmaydi
 * (masalan, telefon bo'sh bo'lsa header va footerda telefon tugmasi chiqmaydi).
 * Real ma'lumotlarni shu yerga kiriting — boshqa joyni o'zgartirish shart emas.
 */
export const site = {
  brand: 'Dermolife Complex',

  contacts: {
    /** Ko'rinadigan format, masalan: '+998 90 123 45 67' */
    phone: '+998 77 157 12 12',
    /** Instagram profil havolasi, masalan: 'https://instagram.com/dermolife.uz' */
    instagram: '',
    /** Telegram havolasi, masalan: 'https://t.me/dermolife' */
    telegram: '',
    /** Ish vaqti, masalan: 'Har kuni 09:00 – 21:00' */
    workingHours: '',
    /** Manzil (ixtiyoriy) */
    address: '',
  },

  /**
   * Mutaxassislar. Yangi mutaxassis qo'shish uchun obyekt qo'shing va
   * rasmni src/assets/images papkasiga joylab, `photo` ga import qiling.
   */
  specialists: [
    {
      id: 'main',
      /** Mutaxassis ismi. Bo'sh bo'lsa "Dermolife mutaxassisi" ko'rsatiladi. */
      name: '',
      /** Lavozimi. Bo'sh bo'lsa ko'rsatilmaydi. */
      role: '',
      /** Qo'shimcha ma'lumotlar (tajriba, yo'nalish va h.k.) — har biri alohida qator. */
      facts: [],
      photoKey: 'specialist',
    },
  ],
}

/** Telefonni tel: havolaga aylantiradi */
export const phoneHref = (phone) => (phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : '')
