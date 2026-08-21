import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../api/products.api.js';
import { useCart } from '../hooks/useCart.js';

const roastLabels = {
  light: 'Light Roast',
  medium: 'Medium Roast',
  dark: 'Dark Roast',
};

export function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    setStatus('loading');
    setQuantity(1);
    getProductBySlug(slug)
      .then(({ product: found }) => {
        setProduct(found);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [slug]);

  if (status === 'loading') return <p className="mx-auto max-w-4xl px-6 py-16">Loading...</p>;
  if (status === 'error' || !product) {
    return <p className="mx-auto max-w-4xl px-6 py-16">Product not found.</p>;
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-2">
  <div className="aspect-square overflow-hidden rounded-lg bg-cream-dark">
    <img
      src={product.images?.[0]}
      alt={product.name}
      className="h-full w-full object-cover"
    />
  </div>

  <div>
    <span className="inline-block rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-wide text-gold">
      {roastLabels[product.roastLevel] ?? product.roastLevel}
    </span>

    <h1 className="mt-4 font-display text-4xl text-espresso">{product.name}</h1>
    <p className="mt-2 text-charcoal/70">{product.origin}</p>
    <p className="mt-6 max-w-md text-charcoal/90">{product.description}</p>

    {product.tastingNotes?.length > 0 && (
      <div className="mt-6 flex flex-wrap gap-2">
        {product.tastingNotes.map((note) => (
          <span
            key={note}
            className="rounded-full bg-cream-dark px-3 py-1 text-xs text-charcoal/70"
          >
            {note}
          </span>
        ))}
      </div>
    )}

    <p className="mt-6 font-display text-2xl text-gold">${product.price}</p>

    {product.stock > 0 && product.stock <= 10 && (
      <p className="mt-1 text-sm text-charcoal/60">Only {product.stock} left in stock</p>
    )}

    <div className="mt-6 flex items-center gap-4">
      <div className="flex items-center rounded-full border border-cream-dark">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-4 py-2 text-lg text-espresso"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
          className="px-4 py-2 text-lg text-espresso"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => addItem(product, quantity)}
        disabled={product.stock === 0}
        className="rounded-full bg-espresso px-8 py-3 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold hover:text-espresso disabled:opacity-50"
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  </div>
</section>
  );
}
