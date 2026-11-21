// src/components/Navbar.jsx
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { nav, moreNav, socials } from '../data/site';
import { Chevron } from './Icons';

const linkCls = (active) =>
  `relative py-2 text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:origin-left after:bg-navy after:transition-transform after:duration-300 ${
    active ? 'text-navy after:scale-x-100' : 'text-navy/65 hover:text-navy after:scale-x-0 hover:after:scale-x-100'
  }`;

function More() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const active = moreNav.some((n) => pathname.startsWith(n.to));

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 ${linkCls(active)}`}>
        More <Chevron className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`absolute right-0 top-full w-44 pt-3 transition-all duration-300 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
        <ul className="border border-navy/15 bg-warm p-2 shadow-xl">
          {moreNav.map((n) => (
            <li key={n.to}>
              <NavLink to={n.to}
                className={({ isActive }) => `block px-3 py-2 text-sm font-semibold transition-colors hover:bg-ice/60 ${isActive ? 'text-navy' : 'text-navy/70'}`}>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const goNewsletter = () => {
    setOpen(false);
    if (pathname === '/') document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
    else navigate('/', { state: { scrollTo: 'newsletter' } });
  };

  const all = [...nav, ...moreNav];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-navy/15 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-10">
          <Link to="/" className="flex items-baseline gap-2.5 text-navy">
            <span className="font-display text-[1.7rem] font-semibold leading-none tracking-[-0.03em]">Sammy Iria</span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-navy/60 sm:inline">The Blog</span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => linkCls(isActive)}>
                {n.label}
              </NavLink>
            ))}
            <More />
          </nav>

          <div className="flex items-center gap-3">
            <button type="button" onClick={goNewsletter}
              className="hidden rounded-full bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] text-paper transition hover:bg-blue 2xl:block">
              Subscribe
            </button>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open} className="grid h-11 w-11 place-items-center xl:hidden">
              <span className="relative block h-3 w-6">
                <span className={`absolute left-0 top-0 h-0.5 w-full bg-navy transition-transform duration-500 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
                <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-navy transition-transform duration-500 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu (sibling of the header so the blur doesn't trap the fixed overlay) */}
      <div className={`menu-overlay fixed inset-0 z-40 h-[100dvh] overflow-y-auto bg-paper text-navy xl:hidden ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="flex min-h-full flex-col px-5 pb-10 pt-32">
          <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile">
            {all.map((n, i) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${220 + i * 55}ms` : '0ms' }}
                className={({ isActive }) =>
                  `menu-link flex items-baseline gap-4 border-b border-navy/15 py-2.5 font-display text-[2.1rem] font-semibold leading-none tracking-tight ${isActive ? 'text-blue' : ''}`}>
                <span className="font-mono text-xs font-normal text-navy/50">{String(i + 1).padStart(2, '0')}</span>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="menu-link mt-8" style={{ transitionDelay: open ? '800ms' : '0ms' }}>
            <button type="button" onClick={goNewsletter} className="w-full rounded-full bg-navy py-4 text-sm font-semibold text-paper">
              Subscribe to the Sunday Letter
            </button>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-widest text-navy/60">
              {socials.map((s) => (<span key={s.key}>{s.label}</span>))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}