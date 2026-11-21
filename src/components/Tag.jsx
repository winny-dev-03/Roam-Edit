// src/components/Tag.jsx
import { categories } from '../data/site';

export default function Tag({ category, kind, className = '' }) {
  const c = categories[category];
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
      {kind && <span className="opacity-60">· {kind}</span>}
    </span>
  );
}