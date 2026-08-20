import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export function Profile() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl text-espresso">My Profile</h1>

      <div className="mt-8 rounded-lg border border-cream-dark bg-ivory p-6">
        <p className="text-charcoal/90">
          <span className="font-medium text-espresso">Name:</span> {user?.name}
        </p>
        <p className="mt-2 text-charcoal/90">
          <span className="font-medium text-espresso">Email:</span> {user?.email}
        </p>
      </div>

      <Link to="/profile/orders" className="mt-6 inline-block text-gold hover:underline">
        View order history
      </Link>
    </section>
  );
}
