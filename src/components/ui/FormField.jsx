import { useId } from 'react';

export function FormField({ label, type = 'text', required = false, className = '', ...inputProps }) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs uppercase tracking-wide text-charcoal/70">
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        className={`rounded border border-cream-dark bg-ivory px-4 py-2 text-espresso outline-none transition-colors focus:border-gold ${className}`}
        {...inputProps}
      />
    </div>
  );
}
