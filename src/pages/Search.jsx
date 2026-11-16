// src/pages/Search.jsx
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ARTICLES, DESTINATIONS, GUIDES } from "../data/content.js";
import Img from "../components/Img.jsx";
import { Chip, Label } from "../components/Ui.jsx";

const INDEX = [
  ...DESTINATIONS.map((d) => ({ type: "Destination", to: `/destinations/${d.slug}`, title: d.name, text: `${d.tagline} ${d.blurb}`, meta: d.country, tags: d.tags.join(" "), kind: d.kind, seed: d.seed, image: d.image })),
  ...ARTICLES.map((a) => ({ type: "Story", to: `/stories/${a.slug}`, title: a.title, text: a.dek, meta: a.category, tags: `${a.topic || ""} ${a.category}`, kind: a.kind, seed: a.seed, image: a.image })),
  ...GUIDES.map((g) => ({ type: "Guide", to: "/guides", title: g.title, text: g.desc, meta: g.type, tags: g.steps.join(" "), kind: g.kind, seed: g.seed })),
];

const SUGGEST = ["Lagos", "Safari", "Fintech", "Dunes", "Packing", "Coffee"];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function score(item, terms) {
  const t = item.title.toLowerCase();
  const rest = `${item.text} ${item.tags} ${item.meta}`.toLowerCase();
  let s = 0;
  for (const w of terms) {
    if (t.includes(w)) s += t.startsWith(w) ? 8 : 5;
    else if (rest.includes(w)) s += 2;
    else return 0; // every word must match somewhere
  }
  return s;
}

function Mark({ text, terms }) {
  if (!terms.length) return text;
  const parts = text.split(new RegExp(`(${terms.map(esc).join("|")})`, "gi"));
  return parts.map((p, i) => (terms.includes(p.toLowerCase()) ? <mark key={i} className="bg-blue/30 text-inherit">{p}</mark> : p));
}

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const [type, setType] = useState("All");
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);

  const results = useMemo(
    () => (terms.length ? INDEX.map((it) => ({ it, s: score(it, terms) })).filter((r) => r.s > 0).sort((a, b) => b.s - a.s).map((r) => r.it) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [q]
  );
  const shown = results.filter((r) => type === "All" || r.type === type);
  const count = (t) => results.filter((r) => t === "All" || r.type === t).length;

  return (
    <section className="wrap pb-28 pt-32 lg:pt-40">
      <Label className="text-blue">Search</Label>
      <div className="mt-4 flex items-end gap-4 border-b border-navy">
        <input
          value={q}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
          placeholder="Search places, stories, guides…"
          aria-label="Search"
          autoFocus
          className="display w-full bg-transparent py-4 text-[clamp(2.4rem,8vw,7rem)] placeholder:text-navy/20 focus:outline-none"
        />
        {q && <button onClick={() => setParams({})} className="mb-5 shrink-0 text-sm font-semibold underline underline-offset-4">Clear</button>}
      </div>

      {!q ? (
        <div className="py-20">
          <p className="display text-4xl">Try one of these.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {SUGGEST.map((s) => (
              <button key={s} onClick={() => setParams({ q: s })} className="display border border-navy/25 px-6 py-3 text-3xl transition-colors hover:bg-navy hover:text-ice">{s}</button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {["All", "Destination", "Story", "Guide"].map((t) => (
              <Chip key={t} active={type === t} onClick={() => setType(t)}>{t} · {count(t)}</Chip>
            ))}
            <Label className="ml-auto text-navy/50">{shown.length} result{shown.length === 1 ? "" : "s"} for “{q}”</Label>
          </div>

          {shown.length === 0 ? (
            <div className="py-20">
              <p className="display text-5xl">Nothing found for “{q}”.</p>
              <p className="mt-4 text-navy/65">Check the spelling, or try a broader word.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {SUGGEST.map((s) => <button key={s} onClick={() => setParams({ q: s })} className="border border-navy/25 px-4 py-2 text-sm hover:bg-navy hover:text-ice">{s}</button>)}
              </div>
            </div>
          ) : (
            <ul className="mt-6 border-t border-navy">
              {shown.map((r) => (
                <li key={r.to + r.title} className="border-b border-navy/15">
                  <Link to={r.to} className="group grid grid-cols-[5.5rem_1fr] items-center gap-6 py-7 sm:grid-cols-[9rem_1fr_auto]">
                    <Img kind={r.kind} seed={r.seed} src={r.image} alt="" className="aspect-[4/3]" />
                    <div>
                      <Label className="text-blue">{r.type} · {r.meta}</Label>
                      <h2 className="display mt-1 text-[clamp(1.8rem,3.6vw,3rem)] transition-transform duration-500 group-hover:translate-x-2"><Mark text={r.title} terms={terms} /></h2>
                      <p className="mt-2 hidden max-w-2xl text-sm leading-relaxed text-navy/65 sm:block"><Mark text={r.text} terms={terms} /></p>
                    </div>
                    <span className="hidden text-2xl transition-transform duration-300 group-hover:translate-x-1.5 sm:block">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}