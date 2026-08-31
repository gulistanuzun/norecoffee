import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { FormField } from '../components/ui/FormField.jsx';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(form);
      navigate(location.state?.from?.pathname ?? '/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message ?? 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <div className="rounded-lg border border-cream-dark bg-ivory p-8 shadow-sm">
        <h1 className="font-display text-4xl text-espresso">Login</h1>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <FormField
            label="Email"
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
          <FormField
            label="Password"
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-espresso px-8 py-3 text-sm uppercase tracking-wide text-ivory transition-colors hover:bg-gold hover:text-espresso disabled:opacity-50"
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-sm text-charcoal/70">
          Don't have an account?{' '}
          <Link to="/register" className="text-gold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
