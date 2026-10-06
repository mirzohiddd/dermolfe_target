# Dermolife — Backend (API + Telegram bot)

Node.js + Express. Saytdagi formadan kelgan arizani:
1. tekshiradi va `data/leads.json` ga saqlaydi;
2. Telegram bot orqali **guruhga avtomatik yuboradi**;
3. guruhga yuborib bo'lmasa — **adminga** yuboradi.

Telegram ishlamasa ham ariza faylda saqlanib qoladi.

```bash
npm install
npm run dev        # http://localhost:3000 (o'zgarishlarda avtomatik qayta yuklanadi)
npm start          # production
```

## Telegram botni sozlash (5 daqiqa)

1. Telegramda **@BotFather** → `/newbot` → **token** oling va `.env` ga yozing:
   ```
   TELEGRAM_BOT_TOKEN=1234567890:AAH...
   ```
2. `npm run dev` bilan backendni ishga tushiring.
3. **Admin ID:** botga lichkada `/id` yozing → «Sizning ID» ni qo'ying:
   ```
   TELEGRAM_ADMIN_ID=123456789
   ```
   (bir nechta admin: `111,222`)
4. **Guruh ID:** botni guruhga qo'shing, guruhda `/id` yozing → «Chat ID» ni qo'ying:
   ```
   TELEGRAM_GROUP_ID=-1001234567890
   ```
   > Bot guruhdagi `/id` ni ko'rmasa: @BotFather → `/setprivacy` → botingiz → **Disable**.
5. Backendni qayta ishga tushiring. Tayyor ✅

## Bot komandalari

| Komanda | Kim uchun | Vazifasi |
|---|---|---|
| `/id` | hamma | chat va foydalanuvchi ID si |
| `/stats` | admin | bugun / 7 kun / jami, muammolar bo'yicha |
| `/last` | admin | oxirgi 10 ta ariza |
| `/export` | admin | barcha arizalar CSV (Excel'da ochiladi) |

Guruhga keladigan xabar:
```
🆕 Yangi ariza #12

👤 Ism: Dilnoza
📞 Telefon: +998 90 123 45 67
🩺 Muammo: Ekzema
🕒 Vaqt: 06.10.2026, 18:59

📊 Manba:
• utm_source: instagram
```

## .env

| O'zgaruvchi | Tavsif |
|---|---|
| `TELEGRAM_BOT_TOKEN` | @BotFather tokeni |
| `TELEGRAM_GROUP_ID` | arizalar tushadigan guruh ID |
| `TELEGRAM_ADMIN_ID` | admin(lar) ID, vergul bilan |
| `PORT` | default `3000` |
| `BOT_POLLING` | `true` — bot komandalarini tinglaydi |
| `CORS_ORIGIN` | frontend boshqa domenda bo'lsa uning manzili (vergul bilan) |
| `FRONTEND_DIST` | frontend build papkasi (default `../frontend/dist`). Mavjud bo'lsa backend saytni ham beradi |

## API

`POST /api/leads`
```json
{ "name": "Dilnoza", "problem": "ekzema", "phone": "+998901234567", "page": "...", "utm": {} }
```
Javob: `{ "ok": true, "id": 12 }`, xato bo'lsa `422` / `429` / `500` va `{ "ok": false, "message": "..." }`.

`GET /api/health` → `{ "ok": true, "telegram": true }`

## Xavfsizlik
- Bot token faqat backendda.
- Server validatsiya: ism, muammo, O'zbekiston raqami va operator kodi.
- Spamdan himoya: honeypot, IP limiti (10 daqiqada 5 ta), bir raqamdan 5 daqiqada takroriy ariza qayta yuborilmaydi.
- Backend **bitta nusxada** ishlashi kerak (bot polling).

## Struktura
```
src/
├── index.js       # Express: /api/leads, /api/health
├── telegram.js    # guruhga yuborish, komandalar
├── store.js       # data/leads.json
├── validate.js    # validatsiya, muammolar ro'yxati
└── config.js      # .env o'qish
data/              # arizalar
```
