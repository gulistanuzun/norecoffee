import { useEffect, useState } from 'react';
import { getMyOrders } from '../api/orders.api.js';

export function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getMyOrders()
      .then(({ orders: list }) => {
        setOrders(list);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl text-espresso">Order History</h1>

      {status === 'loading' && <p className="mt-8 text-charcoal/70">Loading orders...</p>}
      {status === 'error' && <p className="mt-8 text-charcoal/70">Could not load orders.</p>}
      {status === 'ready' && orders.length === 0 && (
        <p className="mt-8 text-charcoal/70">You haven't placed any orders yet.</p>
      )}

      <div className="mt-8 flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border border-cream-dark bg-ivory p-4">
            <p className="font-medium text-espresso">Order #{order.id.slice(-6)}</p>
            <p className="text-sm text-charcoal/70">
              {new Date(order.createdAt).toLocaleDateString()} &middot; {order.status}
            </p>
            <p className="mt-2 font-medium text-gold">${order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
