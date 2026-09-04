# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

NoreCoffee — a full-stack luxury coffee e-commerce site (React + Node/Express + MongoDB), built as a CV/portfolio project by a recent coding bootcamp graduate. Must be responsive, "luxury/premium" in look and feel, with Framer Motion (React-driven UI transitions) + GSAP (scroll-choreographed cinematic sections) animation.

**The full plan lives at** `C:\Users\Gülistan\.claude\plans\yaz-l-m-kursundan-yeni-mezun-unified-lynx.md` — read it first for the complete architecture, data models, API routes, component breakdown, palette/fonts, and phase breakdown. This file only tracks current build status and immediate next steps.

## Current build status (in progress)

**Backend (`server/`) — Phase 1 & 2 done, verified against a real DB.**
- Express app, Mongoose models (`User`, `Product`, `Order`), JWT auth (register/login/me), product API (filter/search/pagination by slug), order API (create/mine/mine/:id), centralized error handling, validation (express-validator), rate limiting + helmet + cors.
- `server/.env` holds a **MongoDB Atlas** connection string (`MONGODB_URI`, free-tier cluster) and a generated `JWT_SECRET` — no local MongoDB install needed.
- **Connection verified 2026-09-04**: connected successfully via mongoose, database `norecoffee` has `products` (19 docs), `users` (3 docs), `orders` (2 docs) — meaning register/login and at least one checkout have already been exercised against real data, not just in theory.
- Seed script: `npm --prefix server run seed` (wipes and reseeds `products`).

**Frontend (root) — well past Phase 3; most of Phase 6/7 is already in place.**
- Installed: `react-router-dom`, `framer-motion`, `gsap`, `axios`, `tailwindcss` + `@tailwindcss/vite`, `@fontsource/cormorant-garamond`, `@fontsource/inter`.
- `vite.config.js`: `tailwindcss()` plugin + `/api` dev proxy to `http://localhost:5000`.
- `src/index.css`: Tailwind v4 `@theme` tokens (espresso/cream/gold luxury palette, Cormorant Garamond + Inter) — see the plan file for exact values.
- `src/api/`, `src/context/` (`AuthContext`, `CartContext`, `ToastContext`), `src/hooks/` (`useAuth`, `useCart`) as originally scaffolded.
- `src/layouts/RootLayout.jsx` — navbar (live cart count, auth-aware) + footer + `<Outlet/>`.
- `src/routes/router.jsx` + `ProtectedRoute.jsx` — all routes from the plan are wired, including `*` → `NotFound`.
- Pages are no longer "plain": `ProductCard`/`ProductCardSkeleton`, `FilterSidebar` (roast/price/sort + mobile toggle), `CartDrawer` (slide-in from the right) + toast notifications (`ToastContext`/`Toaster`), loading skeletons and improved empty states on Shop, `OrderConfirmation` page after checkout, and a fully reworked luxury `Profile` page (hero panel, gold-framed stats, animated blocks).
- Animation split matches the plan: **Framer Motion** does page transitions, cart drawer, hover/scroll-reveal on product cards, staggered page sections (e.g. `Profile.jsx`); **GSAP** (`gsap.timeline` + `ScrollTrigger`) is used in `HeroSection.jsx` and `BrandStory.jsx` for the parallax/cinematic hero and brand-story scroll choreography — this is the intended scope per the plan, not a partial implementation.
- `npm run build` and `npm run lint` both pass.
- **Accessibility pass — mostly done (2026-09-04)**: global `*:focus-visible` ring (gold, defined in `src/index.css`) for keyboard navigation; `Toaster.jsx` toasts are announced via `role="status" aria-live="polite"`; `CartDrawer.jsx` is marked `role="dialog" aria-modal="true"` and moves focus to its close button on open (via a `useRef`). Verified: global focus ring works site-wide (confirmed via manual Tab test on the navbar). Focus ring inside the cart drawer: **confirmed working (2026-09-04)** — the earlier `reportAllChanges`/`startTime` console error tied to this doubt was root-caused to uBlock Origin interfering with the Performance API (see responsive-pass note below), not a real bug. Remaining: decorative image `alt=""`/`aria-hidden` audit (not started).
- **Not yet done**: a *deliberate, checklist-style* manual browser pass over the full golden path (register → browse/filter → detail → cart → checkout → confirmation → profile/order history → logged-out redirect checks) hasn't been logged, even though the DB data shows ad-hoc testing already happened.
- **Responsive pass — done (2026-09-04)**: manually checked at 375/640/768/1024/1280px in Chrome DevTools device toolbar. Navbar hamburger menu, Shop's `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` breakpoints, FilterSidebar's mobile "Filters" toggle and its Min/Max/Go price row (fine even in the 220px `lg` sidebar column, despite suspicion) all confirmed working. Two real bugs found and fixed: `Checkout.jsx`'s City/Postal `<div className="flex gap-4">` row was cramped at 375px → changed to `flex flex-col gap-4 sm:flex-row`; `Profile.jsx`'s stats row (`grid-cols-3`) let "September 2026" wrap to two lines at 375px, misaligning the row → changed to `grid-cols-1 gap-4 sm:grid-cols-3` (same pattern as Shop's grid). Noted but left as-is: on tall viewports Shop's "Show More" button sits well above the footer — this is the intended sticky-footer behavior (`<main className="flex-1">` in `RootLayout.jsx`), not a bug. Also noted, unrelated to responsiveness: a console error appearing right after login (`Cannot read properties of undefined (reading 'startTime')` at `reportAllChanges`) — **confirmed 2026-09-04** as uBlock Origin/Performance API interference, not a real bug: reproduces with the extension on, does not reproduce in an incognito window. Same root cause as the earlier CartDrawer focus-ring suspicion — that can now be trusted as working correctly.

## Immediate next steps (resume here)

1. Do a deliberate end-to-end golden-path pass in the browser (both dev servers running) and note any bugs found — DB already has real data so this can start immediately, no MongoDB setup needed.
2. Accessibility pass — finish the last piece: audit images across the site (`ProductCard`, `ProductDetail`, `HeroSection`, `BrandStory`, `Cart`, `FilterSidebar`, `FormField`) and mark purely decorative ones `aria-hidden="true"` (or `alt=""`); content images already have real `alt` text.
3. Remaining optional polish from the plan's Phase 7: consider deployment (Vercel/Netlify + Render/Railway, Atlas is already in place). `README.md` is done (2026-09-04) — real feature list, stack, structure, and setup steps replaced the default Vite template.

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
