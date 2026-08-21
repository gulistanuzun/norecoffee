import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';

const MotionLink = motion.create(Link);

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.708 2.602-7.202.126-.518-.263-1.048-.796-1.048H5.25M7.5 14.25L5.106 5.272M9.75 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
}

function NavItem({ to, end, children }) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <motion.span
          className={`inline-block font-display text-lg tracking-wide sm:text-xl ${
            isActive ? 'text-gold' : 'text-cream'
          }`}
          whileHover={{ x: 4, color: '#c6a15b' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {children}
        </motion.span>
      )}
    </NavLink>
  );
}

export function RootLayout() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-cream text-charcoal">
      <header
  className={`sticky top-0 z-50 border-b border-ivory/10 bg-espresso transition-shadow duration-300 ${
    scrolled ? 'shadow-lg shadow-espresso/40' : ''
  }`}
>
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <MotionLink
            to="/"
            className="font-display text-4xl tracking-wide text-ivory sm:text-5xl"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover="hover"
          >
            <motion.span
              className="inline-block font-medium"
              variants={{ hover: { x: -2 } }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Nore
            </motion.span>
            <motion.span
              className="inline-block italic text-gold"
              variants={{ hover: { x: 2, color: '#dec48c' } }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Coffee
            </motion.span>
          </MotionLink>

          <div className="hidden items-center gap-8 md:flex">
            <NavItem to="/" end>
              Home
            </NavItem>
            <NavItem to="/shop">Shop</NavItem>
            <NavLink to="/cart" className="relative flex items-center text-cream">
  <CartIcon />
  {itemCount > 0 && (
    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-semibold text-espresso">
      {itemCount}
    </span>
  )}
</NavLink>

            {user ? (
              <>
                <NavItem to="/profile">Profile</NavItem>
                <motion.button
                  type="button"
                  onClick={logout}
                  className="font-display text-lg tracking-wide text-cream sm:text-xl"
                  whileHover={{ x: 4, color: '#c6a15b' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <NavItem to="/login">Login</NavItem>
            )}
          </div>
          <button
  type="button"
  onClick={() => setMenuOpen((open) => !open)}
  className="flex flex-col gap-1.5 md:hidden"
  aria-label="Menu"
>
  <motion.span
    className="h-0.5 w-7 bg-cream"
    animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
  />
  <motion.span
    className="h-0.5 w-7 bg-cream"
    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
  />
  <motion.span
    className="h-0.5 w-7 bg-cream"
    animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
  />
</button>
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="absolute left-0 right-0 top-full flex flex-col items-center gap-6 bg-espresso py-8 md:hidden"
    >
      <NavItem to="/" end>
        Home
      </NavItem>
      <NavItem to="/shop">Shop</NavItem>
      <NavItem to="/cart">Cart ({itemCount})</NavItem>
      {user ? (
        <>
          <NavItem to="/profile">Profile</NavItem>
          <button
            type="button"
            onClick={logout}
            className="font-display text-lg tracking-wide text-cream sm:text-xl"
          >
            Logout
          </button>
        </>
      ) : (
        <NavItem to="/login">Login</NavItem>
      )}
    </motion.div>
  )}
</AnimatePresence>

        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-espresso py-8 text-center text-sm text-cream">
        <p>&copy; {new Date().getFullYear()} NoreCoffee. All rights reserved.</p>
      </footer>
    </div>
  );
}
