import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero="kicker"]', { opacity: 0, y: 16, duration: 0.6 })
        .from('[data-hero="line"]', { scaleX: 0, duration: 0.7 }, '-=0.3')
        .from(
          '[data-hero="heading"]',
          { opacity: 0, y: 28, duration: 0.9, stagger: 0.12 },
          '-=0.4'
        )
        .from('[data-hero="subtext"]', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
        .from('[data-hero="cta"]', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4');
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-espresso px-6 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 40%, rgba(198,161,91,0.16) 0%, rgba(198,161,91,0) 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none font-display text-[28vw] leading-none text-ivory/[0.03]"
      >
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          NoreCoffee
        </span>
      </div>

      <div className="relative z-10 flex max-w-5xl flex-col items-center">
        <p
          data-hero="kicker"
          className="text-xs uppercase tracking-[0.4em] text-gold"
        >
          Small-Batch &middot; Single-Origin
        </p>

        <span
          data-hero="line"
          className="mt-5 h-px w-16 origin-center bg-gold/60"
        />

        <h1
          className="mt-8 font-display font-medium leading-[0.95] text-ivory"
          style={{ fontSize: 'clamp(4.5rem, 11vw, 10rem)' }}
        >
          <span data-hero="heading" className="block tracking-tight">
            Coffee,
          </span>
          <span data-hero="heading" className="block italic tracking-tight text-gold">
            Elevated.
          </span>
        </h1>

        <p
          data-hero="subtext"
          className="mt-10 max-w-xl text-lg leading-relaxed text-cream/70"
        >
          Small-batch, single-origin beans roasted for depth and clarity. Discover a collection
          curated for the discerning palate.
        </p>

        <Link
          data-hero="cta"
          to="/shop"
          className="mt-10 rounded-full border border-gold px-10 py-3.5 text-xs uppercase tracking-[0.25em] text-ivory transition-colors duration-300 hover:bg-gold hover:text-espresso"
        >
          Shop the Collection
        </Link>
      </div>
    </section>
  );
}
