// src/components/Masthead.jsx
import SmartImage from './SmartImage';
import { sections, img } from '../data/site';

export default function Masthead({ section }) {
  const s = sections[section];
  return (
    <section className="border-b border-navy/20 bg-paper">
      <div className="mx-auto grid max-w-[1400px] items-end gap-8 px-4 pb-10 pt-10 md:px-10 md:pb-14 md:pt-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="rise mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-navy/65">
            <span className="h-3 w-[3px] bg-blue" /> {s.kicker}
          </p>
          <h1 className="rise font-display text-[length:clamp(3.2rem,10vw,8.5rem)] font-semibold leading-[0.88] tracking-[-0.045em]"
            style={{ animationDelay: '100ms' }}>
            {s.title}
          </h1>
          <p className="rise mt-6 max-w-xl text-lg text-navy/75" style={{ animationDelay: '220ms' }}>{s.intro}</p>
        </div>
        <div className="rise lg:col-span-5" style={{ animationDelay: '300ms' }}>
          <SmartImage src={img(s.photo, 1400)} alt={s.photoAlt} ratio="4/3" priority />
        </div>
      </div>
    </section>
  );
}