import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getMyOrderById } from '../api/orders.api.js';

export function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getMyOrderById(id)
      .then(({ order: o }) => {
        setOrder(o);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [id]);

  if (status === 'loading') {
    return <p className="mx-auto max-w-2xl px-6 py-16 text-charcoal/70">Loading your order…</p>;
  }
  if (status === 'error') {
    return (
      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <p className="text-charcoal/70">We couldn't find that order.</p>
        <Link to="/profile/orders" className="mt-4 inline-block text-gold underline">
          Go to order history
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="#c6a15b" strokeWidth="2" className="h-8 w-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </motion.div>

      <h1 className="mt-6 text-center font-display text-4xl text-espresso">Thank you!</h1>
      <p className="mt-2 text-center text-charcoal/70">
        Your order <span className="font-medium text-espresso">#{order.id.slice(-6)}</span> is confirmed.
      </p>

      <div className="mt-10 rounded-lg border border-cream-dark bg-ivory p-6">
        <ul className="flex flex-col gap-3">
          {order.items.map((item) => (
            <li key={item.product} className="flex justify-between text-sm">
              <span className="text-charcoal/80">
                {item.name} &times; {item.quantity}
              </span>
              <span className="font-medium text-espresso">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between border-t border-cream-dark pt-4 font-display text-xl text-espresso">
          <span>Total</span>
          <span className="text-gold">${order.total.toFixed(2)}</span>
        </div>
        <p className="mt-4 text-sm text-charcoal/60">
          Shipping to: {order.shippingAddress.line1}, {order.shippingAddress.city},{' '}
          {order.shippingAddress.country}
        </p>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          to="/shop"
          className="rounded-full border border-gold px-6 py-2 font-display text-gold transition-colors hover:bg-gold hover:text-espresso"
        >
          Continue shopping
        </Link>
        <Link
          to="/profile/orders"
          className="rounded-full bg-espresso px-6 py-2 font-display text-ivory transition-colors hover:bg-gold hover:text-espresso"
        >
          View all orders
        </Link>
      </div>
    </section>
  );
}
