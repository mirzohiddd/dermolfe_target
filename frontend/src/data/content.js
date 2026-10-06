/**
 * Landing kontenti. Barcha matnlar Dermolife mahsulot materiallaridan olingan.
 */
import syrupImg from '@/assets/images/product-syrup.webp'
import creamImg from '@/assets/images/product-cream.webp'
import soapImg from '@/assets/images/product-soap.webp'

import handsBefore from '@/assets/images/hands-before.webp'
import handsAfter from '@/assets/images/hands-after.webp'
import soleBefore from '@/assets/images/sole-before.webp'
import soleAfter from '@/assets/images/sole-after.webp'
import backBefore from '@/assets/images/back-before.webp'
import backAfter from '@/assets/images/back-after.webp'
import torsoBefore from '@/assets/images/torso-before.webp'
import torsoAfter from '@/assets/images/torso-after.webp'
import footBefore from '@/assets/images/foot-before.webp'
import footAfter from '@/assets/images/foot-after.webp'
import legsBefore from '@/assets/images/legs-before.webp'
import legsAfter from '@/assets/images/legs-after.webp'

/** Formadagi "Muammo" select variantlari va muammo kartochkalari uchun yagona manba */
export const problems = [
  {
    value: 'psoriaz',
    title: 'Psoriaz',
    text: 'Qipiqlanuvchi qizil blyashkalar, terining qalinlashishi va yorilishi.',
    icon: 'layers',
  },
  {
    value: 'ekzema',
    title: 'Ekzema',
    text: 'Qichishish, quruqlik, yoriqlar — ayniqsa qo‘l va oyoqlarda.',
    icon: 'droplet-off',
  },
  {
    value: 'allergik-toshma',
    title: 'Allergik toshmalar',
    text: 'To‘satdan paydo bo‘ladigan qizil dog‘lar va qichiydigan toshmalar.',
    icon: 'spots',
  },
  {
    value: 'qizarish-quruqlik',
    title: 'Qattiq qizarish va quruqlik',
    text: 'Terining tortishishi, qizarishi va namlikni yo‘qotishi.',
    icon: 'sun',
  },
  {
    value: 'stress-toshma',
    title: 'Stress oqibatidagi toshmalar',
    text: 'Asabiylashish va zo‘riqishdan keyin kuchayadigan teri reaksiyalari.',
    icon: 'brain',
  },
  {
    value: 'yalliglanish',
    title: 'Teridagi yallig‘lanish',
    text: 'Uzoq bitmaydigan, qayta-qayta qaytalanuvchi yallig‘lanish o‘choqlari.',
    icon: 'flame',
  },
]

export const problemOptions = [
  ...problems.map(({ value, title }) => ({ value, label: title })),
  { value: 'boshqa', label: 'Boshqa muammo' },
]

/** Dermolife kompleksi — 3 ta mahsulot */
export const products = [
  {
    id: 'syrup',
    step: '01',
    name: 'Dermolife sirop',
    subname: 'Dermo Detox',
    volume: '250 ml',
    role: 'Ichdan ta’sir',
    image: syrupImg,
    lead: 'Teri sog‘lig‘i uchun ichdan oziqa — yurak, asab va ichakdan terigacha ta’sir etuvchi tabiiy eliksir.',
    ingredients: [
      { name: 'Achchiq tarvuz', text: 'yallig‘lanishni pasaytiradi, toksinlarni chiqaradi' },
      { name: 'Hindiston yong‘og‘i', text: 'immun tizimini faollashtiradi, terini oziqlantiradi' },
      { name: 'Kumush zarralari', text: 'kuchli tabiiy antiseptik' },
      { name: 'Valeriana va melissa', text: 'asabni tinchlantiradi, stress toshmalariga qarshi' },
      { name: 'Avokado, mango, kivi, papaya, anjir', text: 'vitamin va fermentlar manbai' },
      { name: 'Zaytun va zig‘ir ekstraktlari', text: 'ichdan yog‘-namlik muvozanati' },
      { name: 'Na’matak, limon, zanjabil', text: 'C vitaminiga boy, teri immunitetini oshiradi' },
    ],
  },
  {
    id: 'cream',
    step: '02',
    name: 'Dermolife krem',
    subname: 'Dermo Complex Cream',
    volume: '50 g',
    role: 'Tashqaridan ta’sir',
    image: creamImg,
    lead: 'Teri tinchlanadi, namlanadi va qayta yashnaydi. Har kuni, hatto muolaja davomida ham ishlatish mumkin.',
    ingredients: [
      { name: 'Aloe vera', text: 'qattiq qizarish va quruqlikka qarshi namlantiradi' },
      { name: 'Romashka', text: 'sezgir va allergik terini tinchlantiradi' },
      { name: 'Chereda (qoramux)', text: 'toshma va allergiyaga qarshi xalq vositasi' },
      { name: 'Andiz (devyasil)', text: 'terining tabiiy tiklanishini faollashtiradi' },
    ],
  },
  {
    id: 'soap',
    step: '03',
    name: 'Dermolife sovuni',
    subname: '100% Natural Soap',
    volume: '160 g',
    role: 'Kundalik parvarish',
    image: soapImg,
    lead: 'Tabiiy tozalik va do‘stona parvarish — nafaqat yuz, balki butun tana uchun tabiiy himoya qalqoni.',
    ingredients: [
      { name: 'Hindiston yong‘og‘i ekstrakti', text: 'terini yumshatadi, qurishdan himoya qiladi' },
      { name: 'Palma yog‘i', text: 'oziqlantiradi, himoya pardasini tiklaydi' },
      { name: 'Kumush zarralari', text: 'bakteriya va viruslarga qarshi' },
      { name: 'Distillangan suv', text: 'har qanday teri uchun muvozanatli asos' },
    ],
  },
]

/** Oldin / keyin natijalar (real mijozlar fotosuratlari) */
export const results = [
  { id: 'hands', area: 'Qo‘l terisi', before: handsBefore, after: handsAfter },
  { id: 'legs', area: 'Oyoqlar', before: legsBefore, after: legsAfter },
  { id: 'back', area: 'Orqa qismi', before: backBefore, after: backAfter },
  { id: 'torso', area: 'Qorin va ko‘krak', before: torsoBefore, after: torsoAfter },
  { id: 'sole', area: 'Oyoq tagi', before: soleBefore, after: soleAfter },
  { id: 'foot', area: 'Oyoq panjasi', before: footBefore, after: footAfter },
]

/** "Nega Dermolife?" afzalliklari */
export const advantages = [
  {
    icon: 'cycle',
    title: 'Kompleks yondashuv',
    text: 'Sirop ichdan, krem va sovun tashqaridan — teri bir vaqtning o‘zida ikki tomondan parvarish qilinadi.',
  },
  {
    icon: 'leaf',
    title: 'Tabiiy tarkib',
    text: 'Aloe vera, romashka, achchiq tarvuz, valeriana, melissa va mevalar ekstraktlari.',
  },
  {
    icon: 'heart',
    title: 'Butun organizm uchun',
    text: 'Asab, ichak va immunitetni qo‘llab-quvvatlab, terini ichdan tiklashga yordam beradi.',
  },
  {
    icon: 'calendar',
    title: 'Har kuni ishlatish mumkin',
    text: 'Krem kundalik foydalanish uchun mos — hatto muolaja davomida ham.',
  },
  {
    icon: 'shield',
    title: 'Tabiiy himoya',
    text: 'Kumush zarralari — bakteriya va mikroblarga qarshi tabiiy antiseptik.',
  },
  {
    icon: 'user-check',
    title: 'Mutaxassis konsultatsiyasi',
    text: 'Mutaxassis muammongizni o‘rganib, kompleksni qanday qo‘llashni tushuntiradi.',
  },
]
