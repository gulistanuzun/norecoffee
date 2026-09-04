import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { getMyOrders } from '../api/orders.api.js';

const shortcuts = [
  {
    to: '/profile/orders',
    label: 'Order history',
    hint: 'Every cup you have ordered',
    icon: 'M6 2h9l3 3v17l-3-2-3 2-3-2-3 2V2z M9 7h6 M9 11h6 M9 15h4',
  },
  {
    to: '/shop',
    label: 'The collection',
    hint: 'Single origins & signature blends',
    icon: 'M4 8h16l-1.5 12a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2L4 8z M8 8V6a4 4 0 0 1 8 0v2',
  },
  {
    to: '/cart',
    label: 'Your cart',
    hint: 'Items waiting for checkout',
    icon: 'M3 4h2l2.5 12h11L21 7H6 M9 20a1 1 0 1 0 2 0 1 1 0 0 0-2 0z M17 20a1 1 0 1 0 2 0 1 1 0 0 0-2 0z',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function Profile() {
   const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(null);

  useEffect(() => {
    getMyOrders()
      .then(({ orders }) => setOrderCount(orders.length))
      .catch(() => setOrderCount(0));
  }, []);

  const initial = user?.name?.charAt(0).toUpperCase() ?? '?';
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : '—';
  const addressCount = user?.addresses?.length ?? 0;

  const stats = [
    { k: 'Orders placed', v: orderCount ?? '—' },
    { k: 'Member since', v: memberSince },
    { k: 'Saved addresses', v: addressCount },
  ];


  return (
    <section className="relative mx-auto max-w-3xl px-6 py-16">
      {/* ambient glow behind everything */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-4 -z-10 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-gold/25 blur-[120px]"
      />

      <motion.div variants={container} initial="hidden" animate="show">
        {/* hero */}
        <motion.div
          variants={rise}
          className="rounded-[20px] bg-gradient-to-b from-gold/40 via-gold/10 to-transparent p-px shadow-[0_30px_80px_-40px_rgba(43,27,18,0.7)]"
        >
          <div className="relative overflow-hidden rounded-[19px] bg-gradient-to-b from-espresso to-espresso-light px-8 py-14">
            {/* watermark monogram */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 -top-14 select-none font-display text-[13rem] leading-none text-cream opacity-[0.05]"
            >
              {initial}
            </span>

            {/* corner ornaments */}
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 h-7 w-7 border-l border-t border-gold/40" />
            <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4 h-7 w-7 border-r border-t border-gold/40" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 border-b border-l border-gold/40" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 border-b border-r border-gold/40" />
            {/* inner vignette */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[19px] [box-shadow:inset_0_1px_50px_-14px_rgba(198,161,91,0.55)]"
            />

            <div className="relative flex flex-col items-center gap-5 text-center">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-full bg-gold/20 blur-lg"
                />
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold font-display text-5xl text-espresso ring-1 ring-gold/50 ring-offset-4 ring-offset-espresso">
                  {initial}
                </div>
              </div>

              <div>
                <h1 className="bg-gradient-to-r from-gold-light via-gold to-gold-light bg-clip-text font-display text-[2.75rem] leading-tight text-transparent">
                  {user?.name}
                </h1>
                <div className="mx-auto mt-3 flex items-center justify-center gap-3">
                  <span className="h-px w-10 bg-gold/50" />
                  <span className="text-[11px] uppercase tracking-[0.3em] text-gold/80">
                    Signature Member
                  </span>
                  <span className="h-px w-10 bg-gold/50" />
                </div>
                <p className="mt-4 text-sm text-cream/50">{user?.email}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* stats */}
       <motion.div variants={rise} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.k}
              className="rounded-xl border border-cream-dark bg-ivory px-4 py-6 text-center shadow-[0_12px_30px_-24px_rgba(43,27,18,0.6)]"
            >
              <p className="font-display text-2xl text-espresso">{s.v}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-charcoal/40">{s.k}</p>
            </div>
          ))}
        </motion.div>

        {/* details */}
        <motion.div
          variants={rise}
          className="mt-6 overflow-hidden rounded-2xl border border-cream-dark border-l-4 border-l-gold bg-ivory p-8 shadow-[0_20px_50px_-40px_rgba(43,27,18,0.7)]"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Account details</h2>
            <span className="h-px flex-1 bg-cream-dark" />
          </div>

          <dl className="mt-7 space-y-6 text-sm">
            <div className="flex items-baseline justify-between gap-6">
              <dt className="uppercase tracking-[0.18em] text-charcoal/40">Name</dt>
              <dd className="font-display text-xl text-espresso">{user?.name}</dd>
            </div>

            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-cream-dark" />
              <span className="text-gold">&#9670;</span>
              <span className="h-px flex-1 bg-cream-dark" />
            </div>

            <div className="flex items-baseline justify-between gap-6">
              <dt className="uppercase tracking-[0.18em] text-charcoal/40">Email</dt>
              <dd className="font-display text-xl text-espresso">{user?.email}</dd>
            </div>

            <div className="flex items-center gap-4">
              <span className="h-px flex-1 bg-cream-dark" />
              <span className="text-gold">&#9670;</span>
              <span className="h-px flex-1 bg-cream-dark" />
            </div>

            <div className="flex items-baseline justify-between gap-6">
              <dt className="uppercase tracking-[0.18em] text-charcoal/40">Member since</dt>
              <dd className="font-display text-xl text-espresso">{memberSince}</dd>
            </div>
          </dl>
        </motion.div>

        {/* shortcuts */}
        <motion.div
          variants={rise}
          className="mt-6 rounded-2xl border border-cream-dark bg-ivory p-4 shadow-[0_20px_50px_-40px_rgba(43,27,18,0.7)]"
        >
          <div className="flex items-center gap-4 px-4 pt-3">
            <h2 className="text-xs uppercase tracking-[0.3em] text-charcoal/40">Explore</h2>
            <span className="h-px flex-1 bg-cream-dark" />
          </div>
          <ul className="mt-2">
            {shortcuts.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="group flex items-center gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-cream"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-espresso">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d={s.icon} />
                    </svg>
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg text-espresso">{s.label}</span>
                    <span className="block text-xs text-charcoal/50">{s.hint}</span>
                  </span>
                  <span className="text-lg text-gold transition-transform group-hover:translate-x-1">
                    &rsaquo;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={rise} className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="text-xs uppercase tracking-[0.25em] text-charcoal/40 transition-colors hover:text-gold"
          >
            Sign out
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
