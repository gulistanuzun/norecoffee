import { useEffect, useState } from 'react';
import { getProducts } from '../api/products.api.js';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { ProductCardSkeleton } from '../components/product/ProductCardSkeleton.jsx';
import { FilterSidebar } from '../components/product/FilterSidebar.jsx';

export function Shop() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filters, setFilters] = useState({ roast: '', sort: 'newest' });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setStatus('loading');
    setPage(1);
    getProducts({ page: 1, ...filters })
      .then(({ products: list, pages }) => {
        setProducts(list);
        setTotalPages(pages);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [filters]);

function handleLoadMore() {
  const nextPage = page + 1;
  setLoadingMore(true);
     getProducts({ page: nextPage, ...filters })
    .then(({ products: list }) => {
      setProducts((prev) => [...prev, ...list]);
      setPage(nextPage);
    })
    .finally(() => setLoadingMore(false));
}

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-4xl text-espresso">Shop</h1>
      <button
        type="button"
        onClick={() => setShowFilters((v) => !v)}
        className="mt-6 rounded-md border border-cream-dark px-4 py-2 text-sm text-charcoal lg:hidden"
      >
        {showFilters ? 'Hide Filters' : 'Filters'}
      </button>

      <div className="mt-8 grid gap-10 lg:grid-cols-[220px_1fr]">
               <div className={showFilters ? 'block' : 'hidden lg:block'}>
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        <div>
          {status === 'loading' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {status === 'error' && (
            <p className="text-charcoal/70">
              Couldn't reach the product catalog. Make sure the backend is running.
            </p>
          )}

          {status === 'ready' && products.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <p className="font-display text-2xl text-espresso">No coffee here yet</p>
              <p className="text-charcoal/60">Try a different roast filter.</p>
            </div>
          )}

          {status === 'ready' && products.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

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
        </div>
      </div>
    </section>
  );
}

