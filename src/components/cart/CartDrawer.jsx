import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';

export function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, isOpen, closeCart } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="absolute inset-0 bg-espresso/50 backdrop-blur-sm"
          />

          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex items-center justify-between border-b border-cream-dark px-6 py-5">
              <h2 className="font-display text-2xl text-espresso">
                Your Cart{itemCount > 0 && <span className="text-charcoal/50"> ({itemCount})</span>}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close"
                className="text-2xl leading-none text-charcoal/60 transition-colors hover:text-gold"
              >
                &times;
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-charcoal/70">Your cart is empty.</p>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="rounded-full bg-espresso px-8 py-3 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold hover:text-espresso"
                >
                  Browse the Shop
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 divide-y divide-cream-dark overflow-y-auto px-6">
                  {items.map((item) => (
                    <div key={item.product} className="flex gap-4 py-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-cream-dark">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <p className="font-medium text-espresso">{item.name}</p>
                        <p className="text-sm text-charcoal/70">${item.price.toFixed(2)} each</p>

                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-cream-dark">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.product, Math.max(1, item.quantity - 1))
                              }
                              className="px-3 py-1 text-espresso"
                              aria-label="Decrease quantity"
                            >
                              &minus;
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.product, item.quantity + 1)}
                              className="px-3 py-1 text-espresso"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product)}
                            className="text-sm text-charcoal/60 transition-colors hover:text-gold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-cream-dark px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-charcoal/70">Subtotal</span>
                    <span className="font-display text-2xl text-espresso">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    <Link
                      to="/checkout"
                      onClick={closeCart}
                      className="rounded-full bg-espresso px-8 py-3 text-center text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold hover:text-espresso"
                    >
                      Checkout
                    </Link>
                    <Link
                      to="/cart"
                      onClick={closeCart}
                      className="rounded-full border border-cream-dark px-8 py-3 text-center text-sm uppercase tracking-wide text-charcoal transition-colors hover:border-gold hover:text-gold"
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
