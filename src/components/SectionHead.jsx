// src/components/SectionHead.jsx
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { Arrow } from './Icons';

export default function SectionHead({ kicker, title, dark = false, action, className = '' }) {
  return (
    <Reveal className={`mb-8 md:mb-12 ${className}`}>
      <div className={`flex flex-wrap items-end justify-between gap-4 border-t-[3px] pt-4 ${dark ? 'border-paper' : 'border-navy'}`}>
        <div>
          <p className={`mb-2 font-mono text-[11px] uppercase tracking-[0.2em] ${dark ? 'text-ice' : 'text-navy/60'}`}>{kicker}</p>
          <h2 className="font-display text-[length:clamp(2.2rem,5vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
            {title}
          </h2>
        </div>
        {action && (
          <Link to={action.to} className="link-u inline-flex items-center gap-2 text-sm font-semibold">
            {action.label}
            <Arrow className="h-4 w-4" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}