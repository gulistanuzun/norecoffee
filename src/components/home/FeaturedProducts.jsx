import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { getProducts } from '../../api/products.api.js';
import { ProductCard } from '../product/ProductCard.jsx';

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const sectionRef = useRef(null);
 const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    getProducts({ featured: true, limit: 4 })
      .then(({ products: list }) => setProducts(list))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section ref={sectionRef} className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Curated</p>
        <h2 className="mt-4 font-display text-4xl text-espresso">Featured Selections</h2>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  );
}
