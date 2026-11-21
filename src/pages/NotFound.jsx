// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="grid min-h-[70svh] place-items-center bg-paper px-4 text-center">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-navy/60">404</p>
        <h1 className="mt-4 font-display text-[length:clamp(3rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
          This page <span className="font-light italic">wandered off.</span>
        </h1>
        <Link to="/" className="mt-10 inline-block rounded-full bg-navy px-8 py-4 text-sm font-semibold text-paper transition hover:bg-blue">
          Back to the front page
        </Link>
      </div>
    </section>
  );
}