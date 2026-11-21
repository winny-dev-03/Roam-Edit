// src/components/CategoryHero.jsx
import SmartImage from './SmartImage';
import { categories, img } from '../data/site';

export default function CategoryHero({ category, eyebrow, title, intro, image }) {
  const c = categories[category];
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ice">
      <SmartImage src={img(image, 2000)} priority className="hero-zoom absolute inset-0 -z-10 h-full w-full" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-navy/55 to-ink" />
      <div className="absolute inset-0 -z-10 bg-blue/20 mix-blend-multiply" />
      <div className="mx-auto flex min-h-[70svh] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-36 md:px-10 md:pb-20">
        <p className="rise mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-sky">
          <span className={`h-2 w-2 rounded-full ${c.dot}`} /> {eyebrow}
        </p>
        <h1 className="rise font-display text-[length:clamp(3.4rem,12vw,10.5rem)] font-semibold leading-[0.88] tracking-[-0.04em]" style={{ animationDelay: '120ms' }}>
          {title}
        </h1>
        <p className="rise mt-7 max-w-xl text-lg text-ice/80" style={{ animationDelay: '260ms' }}>{intro}</p>
      </div>
    </section>
  );
}