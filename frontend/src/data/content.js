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
    title: 'Псориаз',
    text: 'Қипиқланувчи қизил бляшкалар, терининг қалинлашиши ва ёрилиши.',
    icon: 'layers',
  },
  {
    value: 'ekzema',
    title: 'Экзема',
    text: 'Қичишиш, қуруқлик, ёриқлар — айниқса қўл ва оёқларда.',
    icon: 'droplet-off',
  },
  {
    value: 'allergik-toshma',
    title: 'Аллергик тошмалар',
    text: 'Тўсатдан пайдо бўладиган қизил доғлар ва қичийдиган тошмалар.',
    icon: 'spots',
  },
  {
    value: 'qizarish-quruqlik',
    title: 'Қаттиқ қизариш ва қуруқлик',
    text: 'Терининг тортишиши, қизариши ва намликни йўқотиши.',
    icon: 'sun',
  },
  {
    value: 'stress-toshma',
    title: 'Стресс оқибатидаги тошмалар',
    text: 'Асабийлашиш ва зўриқишдан кейин кучаядиган тери реакциялари.',
    icon: 'brain',
  },
  {
    value: 'yalliglanish',
    title: 'Теридаги яллиғланиш',
    text: 'Узоқ битмайдиган, қайта-қайта қайталанувчи яллиғланиш ўчоқлари.',
    icon: 'flame',
  },
]

export const problemOptions = [
  ...problems.map(({ value, title }) => ({ value, label: title })),
  { value: 'boshqa', label: 'Бошқа муаммо' },
]

/** Dermolife kompleksi — 3 ta mahsulot */
export const products = [
  {
    id: 'syrup',
    step: '01',
    name: 'Dermolife сироп',
    subname: 'Dermo Detox',
    volume: '250 мл',
    role: 'Ичдан таъсир',
    image: syrupImg,
    lead: 'Тери соғлиғи учун ичдан озиқа — юрак, асаб ва ичакдан теригача таъсир этувчи табиий эликсир.',
    ingredients: [
      { name: 'Аччиқ тарвуз', text: 'яллиғланишни пасайтиради, токсинларни чиқаради' },
      { name: 'Ҳиндистон ёнғоғи', text: 'иммун тизимини фаоллаштиради, терини озиқлантиради' },
      { name: 'Кумуш зарралари', text: 'кучли табиий антисептик' },
      { name: 'Валериана ва мелисса', text: 'асабни тинчлантиради, стресс тошмаларига қарши' },
      { name: 'Авокадо, манго, киви, папая, анжир', text: 'витамин ва ферментлар манбаи' },
      { name: 'Зайтун ва зиғир экстрактлари', text: 'ичдан ёғ-намлик мувозанати' },
      { name: 'Наъматак, лимон, занжабил', text: 'С витаминига бой, тери иммунитетини оширади' },
    ],
  },
  {
    id: 'cream',
    step: '02',
    name: 'Dermolife крем',
    subname: 'Dermo Complex Cream',
    volume: '50 г',
    role: 'Ташқаридан таъсир',
    image: creamImg,
    lead: 'Тери тинчланади, намланади ва қайта яшнайди. Ҳар куни, ҳатто муолажа давомида ҳам ишлатиш мумкин.',
    ingredients: [
      { name: 'Алое вера', text: 'қаттиқ қизариш ва қуруқликка қарши намлантиради' },
      { name: 'Ромашка', text: 'сезгир ва аллергик терини тинчлантиради' },
      { name: 'Череда (қорамух)', text: 'тошма ва аллергияга қарши халқ воситаси' },
      { name: 'Андиз (девясил)', text: 'терининг табиий тикланишини фаоллаштиради' },
    ],
  },
  {
    id: 'soap',
    step: '03',
    name: 'Dermolife совуни',
    subname: '100% Natural Soap',
    volume: '160 г',
    role: 'Кундалик парвариш',
    image: soapImg,
    lead: 'Табиий тозалик ва дўстона парвариш — нафақат юз, балки бутун тана учун табиий ҳимоя қалқони.',
    ingredients: [
      { name: 'Ҳиндистон ёнғоғи экстракти', text: 'терини юмшатади, қуришдан ҳимоя қилади' },
      { name: 'Палма ёғи', text: 'озиқлантиради, ҳимоя пардасини тиклайди' },
      { name: 'Кумуш зарралари', text: 'бактерия ва вирусларга қарши' },
      { name: 'Дистилланган сув', text: 'ҳар қандай тери учун мувозанатли асос' },
    ],
  },
]

/** Oldin / keyin natijalar (real mijozlar fotosuratlari) */
export const results = [
  { id: 'hands', area: 'Қўл териси', before: handsBefore, after: handsAfter },
  { id: 'legs', area: 'Оёқлар', before: legsBefore, after: legsAfter },
  { id: 'back', area: 'Орқа қисми', before: backBefore, after: backAfter },
  { id: 'torso', area: 'Қорин ва кўкрак', before: torsoBefore, after: torsoAfter },
  { id: 'sole', area: 'Оёқ таги', before: soleBefore, after: soleAfter },
  { id: 'foot', area: 'Оёқ панжаси', before: footBefore, after: footAfter },
]

/** "Nega Dermolife?" afzalliklari */
export const advantages = [
  {
    icon: 'cycle',
    title: 'Комплекс ёндашув',
    text: 'Сироп ичдан, крем ва совун ташқаридан — тери бир вақтнинг ўзида икки томондан парвариш қилинади.',
  },
  {
    icon: 'leaf',
    title: 'Табиий таркиб',
    text: 'Алое вера, ромашка, аччиқ тарвуз, валериана, мелисса ва мевалар экстрактлари.',
  },
  {
    icon: 'heart',
    title: 'Бутун организм учун',
    text: 'Асаб, ичак ва иммунитетни қўллаб-қувватлаб, терини ичдан тиклашга ёрдам беради.',
  },
  {
    icon: 'calendar',
    title: 'Ҳар куни ишлатиш мумкин',
    text: 'Крем кундалик фойдаланиш учун мос — ҳатто муолажа давомида ҳам.',
  },
  {
    icon: 'shield',
    title: 'Табиий ҳимоя',
    text: 'Кумуш зарралари — бактерия ва микробларга қарши табиий антисептик.',
  },
  {
    icon: 'user-check',
    title: 'Малакали мутахассис консультацияси',
    text: 'Малакали мутахассис муаммонгизни ўрганиб, комплексни қандай қўллашни тушунтиради.',
  },
]
