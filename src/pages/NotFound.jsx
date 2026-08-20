import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-5xl text-espresso">404</h1>
      <p className="mt-4 text-charcoal/70">This page doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block text-gold hover:underline">
        Back to Home
      </Link>
    </section>
  );
}
