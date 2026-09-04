# NoreCoffee

A full-stack luxury coffee e-commerce site — browse, filter, and buy specialty coffee, with authentication, a persistent cart, and order history.

Built as a CV/portfolio project to practice a complete MERN-style stack (React + Node/Express + MongoDB) end to end, from data modeling and REST API design to a fully animated, responsive frontend.

## Features

- **Auth** — register/login with JWT, protected routes, persistent session
- **Catalog** — product listing with roast/price filters, sorting, pagination, search by slug
- **Product detail** — full product page with add-to-cart
- **Cart** — slide-in cart drawer, persists across the session, live item count in the navbar
- **Checkout** — shipping address form → order creation → confirmation page
- **Profile** — account overview, order history, sign out
- **Toast notifications** for cart/auth actions
- **Animation** — Framer Motion for page transitions, cart drawer, hover/scroll-reveal on product cards; GSAP (`ScrollTrigger`) for the cinematic hero and brand-story scroll choreography
- **Responsive** — tested down to 375px (mobile nav, grid breakpoints, forms, filter sidebar)
- **Accessibility** — keyboard focus ring, `aria-live` toast announcements, cart drawer as an `aria-modal` dialog with focus management

## Stack

**Frontend** — React 19, Vite 8, React Router 7, Tailwind CSS v4 (`@theme` tokens, no `tailwind.config.js`), Framer Motion, GSAP, Axios.

**Backend** — Express, Mongoose (MongoDB), JWT auth (`jsonwebtoken` + `bcrypt`), `express-validator`, `helmet`, `express-rate-limit`, `cors`. ESM throughout.

**Database** — MongoDB (MongoDB Atlas in production/dev; any MongoDB instance works).

## Project structure

```
norecoffee/
├─ src/            # React frontend (this is the Vite root)
│  ├─ api/         # axios calls to the backend
│  ├─ components/  # ui / product / cart / home components
│  ├─ context/      # Auth, Cart, Toast context providers
│  ├─ hooks/
│  ├─ layouts/      # RootLayout: navbar + footer + <Outlet/>
│  ├─ pages/
│  └─ routes/        # router.jsx, ProtectedRoute
└─ server/          # Express API, isolated with its own package.json
   ├─ src/
   │  ├─ controllers/
   │  ├─ models/       # User, Product, Order (Mongoose)
   │  ├─ routes/
   │  ├─ middleware/
   │  ├─ validators/
   │  └─ seed/          # seedProducts.js
   └─ .env             # not committed — see .env.example
```

## Getting started

Requires Node.js and a reachable MongoDB instance (local, or a free MongoDB Atlas cluster).

**1. Backend**

```bash
cd server
npm install
cp .env.example .env   # fill in MONGODB_URI and JWT_SECRET
npm run seed            # seeds sample products
npm run dev              # starts the API on http://localhost:5000
```

**2. Frontend** (in a separate terminal, from the repo root)

```bash
npm install
npm run dev               # starts Vite on http://localhost:5173, proxies /api to :5000
```

Open `http://localhost:5173` and register a new account to start shopping.

## Scripts

Frontend (repo root):
| Command | Description |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with Oxlint |

Backend (`server/`):
| Command | Description |
|---|---|
| `npm run dev` | Start the API with Node's built-in `--watch` |
| `npm run start` | Start the API without watch mode |
| `npm run seed` | Wipe and reseed the `products` collection |
