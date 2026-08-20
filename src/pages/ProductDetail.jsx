import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductBySlug } from '../api/products.api.js';
import { useCart } from '../hooks/useCart.js';

export function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState('loading');
  const { addItem } = useCart();

  useEffect(() => {
    setStatus('loading');
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
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl text-espresso">{product.name}</h1>
      <p className="mt-2 text-charcoal/70">
        {product.origin} &middot; {product.roastLevel} roast
      </p>
      <p className="mt-6 max-w-2xl text-charcoal/90">{product.description}</p>
      <p className="mt-6 font-display text-2xl text-gold">${product.price}</p>
      <button
        type="button"
        onClick={() => addItem(product, 1)}
        className="mt-6 rounded-full bg-espresso px-8 py-3 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold hover:text-espresso"
      >
        Add to Cart
      </button>
    </section>
  );
}
