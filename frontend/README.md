# Dermolife — Frontend

Vue 3 + Vite + Tailwind CSS (v4). Mobile-first landing sahifa.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production -> dist/
npm run preview    # build'ni lokal ko'rish
```

Forma arizalarni backendga yuboradi (`POST /api/leads`). Dev rejimda `/api` so'rovlari Vite proxy orqali `http://localhost:3000` ga boradi — backend ham ishlab turishi kerak.

## .env

| O'zgaruvchi | Tavsif |
|---|---|
| `VITE_LEAD_API_URL` | Bo'sh bo'lsa `/api/leads`. Backend boshqa domenda bo'lsa to'liq manzil: `https://api.dermolife.uz/api/leads` |
| `VITE_DEV_API_TARGET` | Dev rejimda backend manzili (default `http://localhost:3000`) |

> `.env` dagi `VITE_` qiymatlar build paytida saytga joylanadi — bu yerga maxfiy ma'lumot (bot token) yozmang.

## Kontent

| Fayl | Nima uchun |
|---|---|
| `src/config/site.js` | telefon, Instagram, Telegram havola, ish vaqti, mutaxassis ism/lavozimi |
| `src/data/content.js` | muammolar (formadagi select), mahsulotlar, oldin/keyin natijalar, afzalliklar |
| `src/assets/images/` | optimallashtirilgan WebP rasmlar |

Muammolar ro'yxatini o'zgartirsangiz, `backend/src/validate.js` dagi `PROBLEMS` ni ham yangilang.

## Struktura

```
src/
├── App.vue, main.js, style.css      # style.css — Tailwind + brend ranglari
├── config/site.js
├── data/content.js
├── services/leadService.js          # backendga ariza yuborish
├── composables/                     # telefon maska (+998), scroll
├── directives/reveal.js             # yengil scroll animatsiya
└── components/
    ├── ui/        AppIcon, BaseButton, BaseModal, SectionHeading, BeforeAfterSlider
    ├── layout/    AppHeader, AppFooter, StickyCta
    └── sections/  Hero, Problems, About, ProductCard, Specialists, Results, Why, LeadForm
```
