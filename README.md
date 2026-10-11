# avoo-strapi-cms

Backend Strapi v5 untuk website Avoo Creator. Sudah berisi: 8 content type, hak akses Public otomatis (baca konten, hanya `create` untuk pesanan), dan seed konten dari data bawaan website (`data/seed.json`).

## Lokal
```bash
npm install
cp .env.example .env     # isi secret (openssl rand -base64 16), biarkan sqlite
SEED_ON_BOOT=true npm run develop
```
Buka http://localhost:1337/admin → buat akun admin. Konten awal sudah terisi.

## Produksi (Render + Neon, gratis)
1. Neon: buat project → salin connection string.
2. Push folder ini ke repo GitHub baru (`avoo-strapi-cms`).
3. Render → New Web Service → repo tadi. Build: `npm install && npm run build`. Start: `npm run start`. Instance: Free.
4. Environment di Render: `NODE_ENV=production`, `DATABASE_CLIENT=postgres`, `DATABASE_URL=<neon>`, `DATABASE_SSL=true`, `PUBLIC_URL=https://<nama>.onrender.com`, `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` (semua acak), `NODE_OPTIONS=--max-old-space-size=460`, dan **sekali saja** `SEED_ON_BOOT=true`.
5. Setelah deploy pertama selesai & konten terisi, hapus `SEED_ON_BOOT` (seed aman diulang, tapi tidak perlu).
6. Buka `/admin`, buat akun admin, lalu isi `STRAPI_URL` di Vercel.

Health check: `https://<nama>.onrender.com/_health` → 204.
Kalau build gagal kehabisan memori di Render free, build di Railway/Fly, atau upgrade instance sementara.
