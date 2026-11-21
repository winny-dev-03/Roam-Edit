// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { nav, moreNav, socials, sammy } from '../data/site';
import { socialIcons } from './Icons';

export default function Footer() {
  return (
    <footer className="bg-navy text-paper">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-10 pt-16 md:grid-cols-12 md:px-10 md:pt-24">
        <div className="md:col-span-5">
          <p className="font-display text-4xl font-semibold tracking-[-0.03em]">Sammy Iria</p>
          <p className="mt-4 max-w-sm font-display text-xl font-light italic leading-snug text-paper/80">"{sammy.quote}"</p>
          <Link to="/contact" state={{ scrollTo: 'advertise' }}
            className="mt-8 inline-block rounded-full border border-paper/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition hover:bg-paper hover:text-navy">
            Advertising enquiries
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ice">Read</p>
            <ul className="space-y-2 text-sm">
              {[...nav.filter((n) => n.to !== '/'), ...moreNav].map((n) => (
                <li key={n.to}><Link to={n.to} className="link-u">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ice">Elsewhere</p>
            <ul className="space-y-2 text-sm">
              {socials.map((s) => {
                const Icon = socialIcons[s.key];
                return (
                  <li key={s.key}>
                    <a href={s.href} onClick={s.placeholder ? (e) => e.preventDefault() : undefined}
                      title={s.placeholder ? 'Placeholder link' : s.label}
                      className="link-u inline-flex items-center gap-2">
                      <Icon className="h-4 w-4" /> {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ice">About</p>
            <p className="text-sm leading-relaxed text-paper/70">
              An independent blog and news digest with Sammy Iria's voice at the centre. Stories marked "Sample" are placeholder content.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 border-t border-paper/15 px-4 py-6 font-mono text-[11px] uppercase tracking-widest text-paper/50 md:px-10">
        <span>© {new Date().getFullYear()} Sammy Iria</span>
        <span>Written, edited and opinionated</span>
      </div>
    </footer>
  );
}