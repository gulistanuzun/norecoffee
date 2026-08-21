import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const roastLabels = {
  light: 'Light Roast',
  medium: 'Medium Roast',
  dark: 'Dark Roast',
};

export function ProductCard({ product }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link
        to={`/shop/${product.slug}`}
        className="group block overflow-hidden rounded-lg border border-cream-dark bg-ivory transition-shadow hover:shadow-xl"
      >
        <div className="aspect-square overflow-hidden bg-cream-dark">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-espresso">{product.name}</span>
            <span className="font-medium text-gold">${product.price}</span>
          </div>
          <p className="mt-1 text-sm text-charcoal/60">{product.origin}</p>
          <span className="mt-3 inline-block rounded-full border border-gold/40 px-3 py-1 text-xs uppercase tracking-wide text-gold">
            {roastLabels[product.roastLevel] ?? product.roastLevel}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
