import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';

export function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="font-display text-4xl text-espresso">Your Cart</h1>
        <p className="mt-4 text-charcoal/70">Your cart is empty.</p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-full bg-espresso px-8 py-3 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold hover:text-espresso"
        >
          Browse the Shop
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl text-espresso">Your Cart</h1>

      <div className="mt-8 divide-y divide-cream-dark">
        {items.map((item) => (
          <div key={item.product} className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-cream-dark">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </div>

            <div className="flex-1">
              <p className="font-medium text-espresso">{item.name}</p>
              <p className="text-sm text-charcoal/70">${item.price} each</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-full border border-cream-dark">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product, Math.max(1, item.quantity - 1))}
                  className="px-3 py-1 text-espresso"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
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
                className="text-sm text-charcoal/60 hover:text-gold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="font-display text-2xl text-espresso">Subtotal: ${subtotal.toFixed(2)}</p>
        <Link
          to="/checkout"
          className="rounded-full bg-espresso px-8 py-3 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold hover:text-espresso"
        >
          Checkout
        </Link>
      </div>
    </section>
  );
}
