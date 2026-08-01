# GearUp Frontend

Role-based outdoor gear rental marketplace built with Next.js 16 and React 19. The application consumes the GearUp Express API in `../assaignment-4-level-2`.

## Features

- Public landing page, category highlights, searchable gear catalog, filters, pagination, and gear details
- Customer and provider registration with cookie-based authentication
- Customer rental orders, Stripe checkout confirmation, payment history, rental details, and returned-order reviews
- Provider gear creation, updates, deletion, inventory management, and rental status lookup/update
- Admin user suspension/activation, category CRUD, all-gear inventory, and all-rental monitoring
- Role-aware navigation and protected customer, provider, and admin dashboards

## Configuration

Create a `.env` file:

```env
BACKEND_URL=https://assaignment-4-level-2.vercel.app/
# Optional request timeout in milliseconds (defaults to 8000)
API_TIMEOUT_MS=8000
```

The frontend defaults to `https://assaignment-4-level-2.vercel.app/` when `BACKEND_URL` is omitted.

For Stripe return handling, the backend `APP_URL` must point to this frontend (normally `http://localhost:3000` during local development).

## Run locally

Start the backend first, then:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npx tsc --noEmit
npm run build
```
