import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orders.api.js';
import { useCart } from '../hooks/useCart.js';

const emptyAddress = { line1: '', line2: '', city: '', postalCode: '', country: '', phone: '' };

export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [address, setAddress] = useState(emptyAddress);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);
    try {
      const { order } = await createOrder({
        items: items.map(({ product, quantity }) => ({ product, quantity })),
        shippingAddress: address,
      });
      clearCart();
      navigate('/profile/orders', { state: { confirmedOrderId: order.id } });
    } catch (err) {
      setError(err.response?.data?.message ?? 'Something went wrong placing your order.');
      setStatus('idle');
    }
  };

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="font-display text-4xl text-espresso">Checkout</h1>
        <p className="mt-4 text-charcoal/70">Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl text-espresso">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <input
          required
          placeholder="Address line 1"
          value={address.line1}
          onChange={handleChange('line1')}
          className="rounded border border-cream-dark bg-ivory px-4 py-2"
        />
        <input
          placeholder="Address line 2 (optional)"
          value={address.line2}
          onChange={handleChange('line2')}
          className="rounded border border-cream-dark bg-ivory px-4 py-2"
        />
        <div className="flex gap-4">
          <input
            required
            placeholder="City"
            value={address.city}
            onChange={handleChange('city')}
            className="flex-1 rounded border border-cream-dark bg-ivory px-4 py-2"
          />
          <input
            required
            placeholder="Postal code"
            value={address.postalCode}
            onChange={handleChange('postalCode')}
            className="flex-1 rounded border border-cream-dark bg-ivory px-4 py-2"
          />
        </div>
        <input
          required
          placeholder="Country"
          value={address.country}
          onChange={handleChange('country')}
          className="rounded border border-cream-dark bg-ivory px-4 py-2"
        />
        <input
          placeholder="Phone (optional)"
          value={address.phone}
          onChange={handleChange('phone')}
          className="rounded border border-cream-dark bg-ivory px-4 py-2"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="mt-4 flex items-center justify-between">
          <p className="font-display text-2xl text-espresso">Total: ${subtotal.toFixed(2)}</p>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-full bg-espresso px-8 py-3 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold hover:text-espresso disabled:opacity-50"
          >
            {status === 'submitting' ? 'Placing order...' : 'Place Order'}
          </button>
        </div>
      </form>
    </section>
  );
}
