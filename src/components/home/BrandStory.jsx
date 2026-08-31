import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function BrandStory() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-parallax="bg"]', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.from('[data-story="text"]', {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 70%',
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[70vh] items-center overflow-hidden bg-espresso-light px-6"
    >
      <div
        data-parallax="bg"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 60% at 80% 30%, rgba(198,161,91,0.14) 0%, rgba(198,161,91,0) 70%)',
        }}
      />

      <div data-story="text" className="relative z-10 mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Our Craft</p>
        <h2 className="mt-4 font-display text-4xl leading-tight text-ivory sm:text-5xl">
          Roasted in small batches, for those who taste the difference.
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
          Every bag is roasted to order in lots under twenty kilos. We work directly with
          growers who share our obsession with terroir, so every cup tells you exactly where
          it came from.
        </p>
      </div>
    </section>
  );
}
