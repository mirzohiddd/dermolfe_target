# Dermolife Complex

```
dermolife/
├── frontend/   # Landing sayt — Vue 3 + Vite + Tailwind CSS
├── backend/    # API + Telegram bot — Node.js + Express
└── deploy/     # nginx va PM2 namunalari
```

Har bir qism alohida: o'z `package.json`, `.env` va `README.md` fayli bor.

Ishlash tartibi:
```
Sayt formasi (frontend) ──POST /api/leads──▶ backend ──▶ data/leads.json
                                                   └──▶ Telegram bot ──▶ guruh
```

## Tez ishga tushirish (lokal)

1-terminal — backend:
```bash
cd backend
npm install
# .env ni to'ldiring: TELEGRAM_BOT_TOKEN, TELEGRAM_GROUP_ID, TELEGRAM_ADMIN_ID
npm run dev            # http://localhost:3000
```

2-terminal — frontend:
```bash
cd frontend
npm install
npm run dev            # http://localhost:5173  (/api avtomatik backendga yo'naltiriladi)
```

Node.js 20.19+ (22 tavsiya etiladi).

Telegram botni sozlash bo'yicha qadamlar: [`backend/README.md`](backend/README.md).

## Serverga joylash (VPS, bitta domen)

```bash
# loyihani /var/www/dermolife ga joylang
cd /var/www/dermolife/frontend && npm install && npm run build      # -> frontend/dist
cd /var/www/dermolife/backend  && npm install                        # .env ni to'ldiring

cd /var/www/dermolife
npm i -g pm2
pm2 start deploy/ecosystem.config.cjs && pm2 save && pm2 startup
```

nginx: `deploy/nginx.conf` ni `/etc/nginx/sites-available/` ga nusxalang — u frontend'ni statik beradi va `/api` ni backendga yo'naltiradi. SSL: `sudo certbot --nginx -d dermolife.uz`.

### Boshqa variantlar
- **Frontend alohida hostingda** (Vercel, Netlify va h.k.), backend VPS'da:
  - `frontend/.env` → `VITE_LEAD_API_URL=https://api.dermolife.uz/api/leads`, keyin `npm run build`
  - `backend/.env` → `CORS_ORIGIN=https://dermolife.uz`
- **nginx'siz:** backend `frontend/dist` ni o'zi ham beradi (`FRONTEND_DIST` sozlamasi) — `npm start` bilan sayt va API bitta portda ishlaydi.
