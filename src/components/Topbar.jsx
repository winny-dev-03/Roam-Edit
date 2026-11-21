// src/components/Topbar.jsx
import { Link } from 'react-router-dom';
import { socials } from '../data/site';
import { socialIcons, ArrowUpRight } from './Icons';

export default function Topbar() {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-navy text-paper">
      <div className="mx-auto flex h-9 max-w-[1400px] items-center justify-between px-3 md:px-10">
        <ul className="flex items-center" aria-label="Social media">
          {socials.map((s) => {
            const Icon = socialIcons[s.key];
            return (
              <li key={s.key}>
                <a
                  href={s.href}
                  target={s.placeholder ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  onClick={s.placeholder ? (e) => e.preventDefault() : undefined}
                  aria-label={s.placeholder ? `${s.label} (placeholder, link not set yet)` : s.label}
                  title={s.placeholder ? `${s.label}: placeholder, add Sammy's real link` : s.label}
                  className="grid h-9 w-8 place-items-center text-paper/75 transition hover:text-white md:w-9"
                >
                  <Icon className="h-[15px] w-[15px]" />
                </a>
              </li>
            );
          })}
        </ul>

        <p className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-paper/65 md:block">{today}</p>

        <Link
          to="/contact"
          state={{ scrollTo: 'advertise' }}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-paper transition hover:text-ice"
        >
          Advertise<span className="hidden sm:inline">&nbsp;with us</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}