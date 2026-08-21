import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProducts } from '../api/products.api.js';
import { ProductCard } from '../components/product/ProductCard.jsx';

export function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [loadingMore, setLoadingMore] = useState(false);

useEffect(() => {
  getProducts({ page: 1 })
    .then(({ products: list, pages }) => {
      setProducts(list);
      setTotalPages(pages);
      setStatus('ready');
    })
    .catch(() => setStatus('error'));
}, []);

function handleLoadMore() {
  const nextPage = page + 1;
  setLoadingMore(true);
  getProducts({ page: nextPage })
    .then(({ products: list }) => {
      setProducts((prev) => [...prev, ...list]);
      setPage(nextPage);
    })
    .finally(() => setLoadingMore(false));
}

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

<motion.div
  className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
  initial="hidden"
  animate="show"
  variants={{
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  }}
>
  {products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ))}
</motion.div>
{status === 'ready' && page < totalPages && (
  <div className="mt-12 flex justify-center">
    <button
      type="button"
      onClick={handleLoadMore}
      disabled={loadingMore}
      className="rounded-full border border-gold px-8 py-3 font-display text-lg text-gold transition-colors hover:bg-gold hover:text-espresso disabled:opacity-50"
    >
      {loadingMore ? 'Loading...' : 'Show More'}
    </button>
  </div>
)}
    </section>
  );
}
