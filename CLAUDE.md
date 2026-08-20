# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

NoreCoffee — a full-stack luxury coffee e-commerce site (React + Node/Express + MongoDB), built as a CV/portfolio project by a recent coding bootcamp graduate. Must be responsive, "luxury/premium" in look and feel, with Framer Motion (React-driven UI transitions) + GSAP (scroll-choreographed cinematic sections) animation.

**The full plan lives at** `C:\Users\Gülistan\.claude\plans\yaz-l-m-kursundan-yeni-mezun-unified-lynx.md` — read it first for the complete architecture, data models, API routes, component breakdown, palette/fonts, and phase breakdown. This file only tracks current build status and immediate next steps.

## Current build status (in progress)

**Backend (`server/`) — Phase 1 & 2 done, untested against a real DB.**
- Express app, Mongoose models (`User`, `Product`, `Order`), JWT auth (register/login/me), product API (filter/search/pagination by slug), order API (create/mine/mine/:id), centralized error handling, validation (express-validator), rate limiting + helmet + cors.
- `server/.env` exists locally with a generated `JWT_SECRET` and `MONGODB_URI=mongodb://localhost:27017/norecoffee`.
- **No MongoDB is installed/running on this machine.** Server code loads and starts without syntax errors (verified via `node src/index.js`, hangs on DB connect as expected) but auth/product/order endpoints have NOT been exercised end-to-end yet. Before further backend testing: either install/start a local MongoDB, or swap `MONGODB_URI` in `server/.env` for a MongoDB Atlas free-tier connection string.
- Seed script ready: `npm --prefix server run seed` (14 coffee products) — needs a working DB connection first.

**Frontend (root) — Phase 3 complete. Builds and lints clean; not yet visually verified in a browser (no MongoDB running to exercise real data).**
- Installed: `react-router-dom`, `framer-motion`, `gsap`, `axios`, `tailwindcss` + `@tailwindcss/vite`, `@fontsource/cormorant-garamond`, `@fontsource/inter`.
- `vite.config.js` updated: `tailwindcss()` plugin added, `/api` dev proxy to `http://localhost:5000` configured.
- `src/index.css` rewritten with Tailwind v4 `@theme` tokens (espresso/cream/gold luxury palette, Cormorant Garamond + Inter fonts) — see the plan file for exact hex values and usage rules.
- `src/api/`: `client.js`, `auth.api.js`, `products.api.js`, `orders.api.js` — thin axios wrappers matching the backend controller response shapes exactly (`{ user, token }`, `{ products, total, page, pages }`, `{ order }`, `{ orders }`, etc.).
- `src/context/AuthContext.jsx` (hydrates from `/api/auth/me` on mount if a token exists, login/register/logout) and `CartContext.jsx` (localStorage-persisted cart, add/remove/updateQuantity/subtotal). Paired hooks in `src/hooks/useAuth.js` / `useCart.js`.
- `src/layouts/RootLayout.jsx` — navbar (with live cart count, auth-aware login/logout) + footer + `<Outlet/>`.
- `src/routes/router.jsx` (`createBrowserRouter`) + `ProtectedRoute.jsx` — routes: `/`, `/shop`, `/shop/:slug`, `/cart`, `/login`, `/register`, protected `/checkout`, `/profile`, `/profile/orders`, `*` → NotFound.
- `src/pages/`: Home, Shop (fetches `/api/products`, doubles as the proxy "ping test"), ProductDetail, Cart, Checkout (shipping form → `POST /api/orders`), Login, Register, Profile, OrderHistory, NotFound. All are functional but intentionally plain — Tailwind-styled with the luxury palette, no Framer Motion/GSAP polish yet (that's Phase 6).
- `src/App.jsx` now just renders `<RouterProvider router={router} />`; `main.jsx` wraps it in `AuthProvider` + `CartProvider` (no `BrowserRouter` needed since the router is created directly).
- `npm run build` and `npm run lint` both pass (lint has 2 harmless `only-export-components` fast-refresh warnings from the context files, no errors).
- **Not yet done**: actual browser verification of the golden path (product list → detail → cart → checkout → order confirmation → profile/order history) — needs a running MongoDB (see backend section) since the DB isn't up on this machine yet.

## Immediate next steps (resume here)

1. Get a MongoDB instance reachable (local install/service, or swap `MONGODB_URI` in `server/.env` for an Atlas free-tier connection string), then run `npm --prefix server run seed`.
2. Run both dev servers (`npm run dev` + `npm --prefix server run dev`) and manually verify the golden path in a browser: browse/filter products → product detail → add to cart → checkout (shipping form) → order confirmation → profile/order history; also verify protected routes redirect to `/login` when logged out.
3. Phase 4/5 polish: the pages built during Phase 3 are functional but minimal — flesh out ProductCard/ProductGrid/FilterSidebar, CartDrawer (slide-in, not just a full Cart page), toasts, loading skeletons, empty states.
4. Then continue with the phase order in the plan file: Phase 6 (Framer Motion page transitions + cart drawer + hover/reveal, GSAP hero/brand-story) → responsive pass.

## Commands

Frontend (root):
- `npm run dev` — Vite dev server (proxies `/api` to `http://localhost:5000`)
- `npm run build` / `npm run preview`
- `npm run lint` — Oxlint (config in `.oxlintrc.json`, not ESLint)

Backend (`server/`):
- `npm --prefix server run dev` — starts Express with `node --watch` (Node 24 built-in watch, no nodemon)
- `npm --prefix server run seed` — wipes and reseeds the `products` collection
- Requires `server/.env` (see `server/.env.example`) and a reachable MongoDB instance.

No test runner is configured on either side.

## Stack

- Frontend: React 19 + Vite 8, React Router, Tailwind CSS v4 (via `@tailwindcss/vite`, config lives in `src/index.css` `@theme`, no `tailwind.config.js`), Framer Motion + GSAP, Axios.
- Backend: Express + Mongoose (MongoDB), JWT auth (`jsonwebtoken` + `bcrypt`), `express-validator`, `helmet`, `express-rate-limit`, `cors`. ESM (`"type": "module"`) on both sides.
- Architecture: monorepo-lite — frontend at repo root, backend isolated in `server/` with its own `package.json`/`node_modules`/`.env`. No shared build tooling between them.
