// src/components/Scene.jsx
import { useId, useMemo } from "react";

// Deterministic art-directed landscape illustrations, built only from the Roam Edit palette.
// They stand in for photography until real images exist in /public/images.

const rng = (seed) => {
  let s = (seed * 2654435761) % 4294967296 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
};

const TONES = ["#B7CCDC", "#7799B5", "#557A97", "#34556E", "#172B3A"];

function ridge(r, base, amp, n, sharp) {
  const pts = Array.from({ length: n + 1 }, (_, i) => [(800 / n) * i, base - r() * amp]);
  let d = `M0 600 L0 ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    if (sharp) d += ` L${x1.toFixed(1)} ${y1.toFixed(1)}`;
    else {
      const cx = ((x0 + x1) / 2).toFixed(1);
      d += ` C${cx} ${y0.toFixed(1)} ${cx} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    }
  }
  return d + " L800 600 Z";
}

function build(kind, seed) {
  const r = rng(seed + 3);
  const sunX = 160 + r() * 480;
  const out = { sunX, sunY: 260, layers: [], blocks: [], windows: [] };

  if (kind === "dunes") {
    const base = [340, 400, 450, 505, 565], amp = [60, 90, 110, 120, 100], n = [4, 5, 5, 6, 5];
    out.layers = base.map((b, i) => ({ d: ridge(r, b, amp[i], n[i], false), fill: TONES[i] }));
  } else if (kind === "peaks") {
    const base = [390, 440, 490, 535, 585], amp = [190, 210, 190, 160, 110], n = [7, 8, 9, 8, 7];
    out.layers = base.map((b, i) => ({ d: ridge(r, b, amp[i], n[i], true), fill: TONES[i] }));
    out.sunY = 230;
  } else if (kind === "coast") {
    out.sunY = 330;
    out.far = ridge(r, 372, 48, 4, false);
    out.near = ridge(r, 610, 70, 4, false);
  } else {
    [[0, 120, 260], [2, 100, 220], [4, 60, 150]].forEach(([tone, lo, hi]) => {
      let x = -10;
      const list = [];
      while (x < 810) {
        const w = 28 + r() * 40;
        const h = lo + r() * (hi - lo);
        list.push({ x, w, h });
        if (tone === 4 && r() > 0.45) out.windows.push({ x: x + 6 + r() * (w - 14), y: 600 - h + 12 + r() * (h - 30) });
        x += w + 2;
      }
      out.blocks.push({ fill: TONES[tone], list });
    });
    out.sunY = 300;
  }
  return out;
}

export default function Scene({ kind = "dunes", seed = 1, className = "" }) {
  const id = useId().replace(/:/g, "");
  const a = useMemo(() => build(kind, seed), [kind, seed]);
  const horizon = kind === "coast" ? 372 : 600;

  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1E3A4E" />
          <stop offset=".55" stopColor="#7799B5" />
          <stop offset="1" stopColor="#F3F7FA" />
        </linearGradient>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7799B5" />
          <stop offset="1" stopColor="#172B3A" />
        </linearGradient>
      </defs>
      <rect width="800" height={kind === "coast" ? horizon : 600} fill={`url(#${id}s)`} />
      <circle cx={a.sunX} cy={a.sunY} r="96" fill="#fff" opacity=".14" />
      <circle cx={a.sunX} cy={a.sunY} r="46" fill="#fff" opacity=".92" />

      {a.layers.map((l, i) => <path key={i} d={l.d} fill={l.fill} />)}

      {kind === "coast" && (
        <>
          <path d={a.far} fill={TONES[2]} />
          <rect y={horizon} width="800" height={600 - horizon} fill={`url(#${id}w)`} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={a.sunX - 60 + i * 6} y={horizon + 14 + i * 26} width={120 - i * 12} height="3" fill="#fff" opacity={0.5 - i * 0.07} />
          ))}
          <path d={a.near} fill={TONES[4]} />
        </>
      )}

      {kind === "city" && (
        <>
          {a.blocks.map((b, i) => (
            <g key={i} fill={b.fill}>
              {b.list.map((k, j) => <rect key={j} x={k.x} y={600 - k.h} width={k.w} height={k.h} />)}
            </g>
          ))}
          {a.windows.map((w, i) => <rect key={i} x={w.x} y={w.y} width="3" height="4" fill="#F3F7FA" opacity=".55" />)}
        </>
      )}
    </svg>
  );
}