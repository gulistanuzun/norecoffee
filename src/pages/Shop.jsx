import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/products.api.js';

export function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getProducts()
      .then(({ products: list }) => {
        setProducts(list);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-espresso">Shop</h1>

      {status === 'loading' && <p className="mt-8 text-charcoal/70">Loading products...</p>}
      {status === 'error' && (
        <p className="mt-8 text-charcoal/70">
          Couldn't reach the product catalog. Make sure the backend is running.
        </p>
      )}
      {status === 'ready' && products.length === 0 && (
        <p className="mt-8 text-charcoal/70">No products yet — run the seed script.</p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/shop/${product.slug}`}
            className="rounded-lg border border-cream-dark bg-ivory p-4 transition-shadow hover:shadow-lg"
          >
            <h2 className="font-display text-xl text-espresso">{product.name}</h2>
            <p className="mt-1 text-sm text-charcoal/70">{product.origin}</p>
            <p className="mt-2 font-medium text-gold">${product.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
