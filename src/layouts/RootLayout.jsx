import { motion } from 'framer-motion';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';

const MotionLink = motion.create(Link);

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
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-cream text-charcoal">
      <header className="border-b border-ivory/10 bg-espresso">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
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

          <div className="flex items-center gap-8">
            <NavItem to="/" end>
              Home
            </NavItem>
            <NavItem to="/shop">Shop</NavItem>
            <NavItem to="/cart">Cart ({itemCount})</NavItem>
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
