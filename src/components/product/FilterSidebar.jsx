import { useState } from 'react';

const roastOptions = [
  { value: '', label: 'All Roasts' },
  { value: 'light', label: 'Light' },
  { value: 'medium', label: 'Medium' },
  { value: 'medium-dark', label: 'Medium-Dark' },
  { value: 'dark', label: 'Dark' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export function FilterSidebar({ filters, onChange }) {
  const set = (patch) => onChange({ ...filters, ...patch });

  const [minDraft, setMinDraft] = useState(filters.minPrice ?? '');
  const [maxDraft, setMaxDraft] = useState(filters.maxPrice ?? '');

  const applyPrice = (e) => {
    e.preventDefault();
    set({ minPrice: minDraft || '', maxPrice: maxDraft || '' });
  };

  return (
    <aside className="space-y-8">
              <div>
        <h2 className="font-display text-lg text-espresso">Roast Level</h2>
        <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
          {roastOptions.map((opt) => {
            const active = filters.roast === opt.value;
            return (
              <button
                key={opt.value || 'all'}
                type="button"
                onClick={() => set({ roast: opt.value })}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? 'border-gold bg-gold text-espresso'
                    : 'border-cream-dark text-charcoal/70 hover:border-gold hover:text-gold'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

            <div>
        <h2 className="font-display text-lg text-espresso">Price</h2>
        <form onSubmit={applyPrice} className="mt-3 flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={minDraft}
            onChange={(e) => setMinDraft(e.target.value)}
            placeholder="Min"
            className="w-full rounded-md border border-cream-dark bg-ivory px-2 py-1.5 text-sm text-charcoal focus:border-gold focus:outline-none"
          />
          <span className="text-charcoal/40">–</span>
          <input
            type="number"
            min="0"
            value={maxDraft}
            onChange={(e) => setMaxDraft(e.target.value)}
            placeholder="Max"
            className="w-full rounded-md border border-cream-dark bg-ivory px-2 py-1.5 text-sm text-charcoal focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md border border-gold px-3 py-1.5 text-sm text-gold transition-colors hover:bg-gold hover:text-espresso"
          >
            Go
          </button>
        </form>
      </div>


      <div>
        <h2 className="font-display text-lg text-espresso">Sort By</h2>
        <select
          value={filters.sort}
          onChange={(e) => set({ sort: e.target.value })}
          className="mt-3 w-full rounded-md border border-cream-dark bg-ivory px-3 py-2 text-sm text-charcoal focus:border-gold focus:outline-none"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

            {(filters.roast || filters.minPrice || filters.maxPrice) && (
        <button
          type="button"
          onClick={() => {
            setMinDraft('');
            setMaxDraft('');
            onChange({ ...filters, roast: '', minPrice: '', maxPrice: '' });
          }}
          className="text-sm text-charcoal/50 underline hover:text-gold"
        >
          Clear filters
        </button>
      )}

    </aside>
  );
}
