// src/components/ui.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export const Label = ({ children, className = "" }) => (
  <span className={`font-mono text-[0.68rem] uppercase tracking-[0.18em] ${className}`}>{children}</span>
);

export const Arrow = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export function Chip({ active, children, ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
        active ? "border-navy bg-navy text-ice" : "border-navy/25 text-navy hover:border-navy"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function TextLink({ to, children, className = "" }) {
  return (
    <Link to={to} className={`group inline-flex items-center gap-3 text-sm font-semibold ${className}`}>
      <span className="link-u pb-1">{children}</span>
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
    </Link>
  );
}

export function Meta({ author, date, read, className = "" }) {
  return (
    <p className={`font-mono text-[0.68rem] uppercase tracking-[0.14em] ${className}`}>
      {[author, date, read && `${read} min`].filter(Boolean).join("  ·  ")}
    </p>
  );
}

// Counts up to a number the first time it scrolls into view.
export function CountUp({ to, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{v}{suffix}</span>;
}

export function PageHeader({ label, children, intro, right }) {
  return (
    <header className="wrap pb-10 pt-32 lg:pt-40">
      <Label className="text-blue">{label}</Label>
      <div className="mt-5 grid items-end gap-8 lg:grid-cols-12">
        <h1 className="display text-[clamp(3.6rem,13vw,12rem)] lg:col-span-8">{children}</h1>
        <div className="lg:col-span-4">
          {intro && <p className="max-w-sm text-lg leading-relaxed text-navy/70">{intro}</p>}
          {right}
        </div>
      </div>
    </header>
  );
}