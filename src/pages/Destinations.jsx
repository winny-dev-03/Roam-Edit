// src/pages/Destinations.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { DESTINATIONS, REGIONS, pad } from "../data/content.js";
import Img from "../components/Img.jsx";
import Reveal from "../components/Reveal.jsx";
import { Chip, Label, PageHeader } from "../components/Ui.jsx";

// Repeating asymmetrical rhythm for the mosaic.
const PATTERN = [
  { span: "md:col-span-7", ratio: "aspect-[16/11]", mt: "" },
  { span: "md:col-span-5", ratio: "aspect-[4/5]", mt: "md:mt-28" },
  { span: "md:col-span-4", ratio: "aspect-[3/4]", mt: "" },
  { span: "md:col-span-8", ratio: "aspect-[16/10]", mt: "md:mt-16" },
  { span: "md:col-span-5", ratio: "aspect-[4/5]", mt: "" },
  { span: "md:col-span-7", ratio: "aspect-[16/11]", mt: "md:mt-24" },
];

export default function Destinations() {
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState("az");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const l = DESTINATIONS.filter(
      (d) =>
        (region === "All" || d.region === region) &&
        `${d.name} ${d.country} ${d.tags.join(" ")}`.toLowerCase().includes(term)
    );
    return [...l].sort((a, b) =>
      sort === "az" ? a.name.localeCompare(b.name) : REGIONS.indexOf(a.region) - REGIONS.indexOf(b.region)
    );
  }, [region, sort, q]);

  return (
    <>
      <PageHeader label="Atlas · 08 places" intro="Eight places we keep returning to, mapped by region, mood and the kind of morning you want.">
        Where <em>next?</em>
      </PageHeader>

      {/* Layered banner: headline above overlaps the image strip */}
      <div className="wrap -mt-2">
        <Img kind="dunes" seed={17} src="/images/destinations-banner.jpg" alt="Dune ridgeline" className="aspect-[21/7] min-h-40 w-full" />
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 mt-12 border-y border-navy/10 bg-ice/95 lg:top-20">
        <div className="wrap flex flex-wrap items-center gap-3 py-4">
          <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto">
            {["All", ...REGIONS].map((r) => (
              <Chip key={r} active={region === r} onClick={() => setRegion(r)}>{r}</Chip>
            ))}
          </div>
          <div className="ml-auto flex w-full items-center gap-4 sm:w-auto">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter: coast, food, hiking…"
              aria-label="Filter destinations"
              className="w-full border-b border-navy/30 bg-transparent py-2 text-sm placeholder:text-navy/40 focus:border-navy focus:outline-none sm:w-56"
            />
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort" className="border border-navy/25 bg-transparent px-3 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
              <option value="az">A – Z</option>
              <option value="region">By region</option>
            </select>
          </div>
        </div>
      </div>

      <section className="wrap py-16 lg:py-24">
        {list.length === 0 ? (
          <div className="py-24 text-center">
            <p className="display text-5xl">Nothing on that map yet.</p>
            <button onClick={() => { setRegion("All"); setQ(""); }} className="mt-6 text-sm font-semibold underline underline-offset-4">Clear filters</button>
          </div>
        ) : (
          <div className="grid items-start gap-x-8 gap-y-16 md:grid-cols-12">
            {list.map((d, i) => {
              const p = PATTERN[i % PATTERN.length];
              return (
                <Reveal key={d.slug} className={`${p.span} ${p.mt}`}>
                  <Link to={`/destinations/${d.slug}`} className="group block">
                    <div className="relative">
                      <Img kind={d.kind} seed={d.seed} src={d.image} alt={d.name} className={p.ratio} />
                      <span className="absolute left-4 top-4 bg-ice px-3 py-1.5"><Label>No. {pad(i + 1)}</Label></span>
                      <span className="absolute bottom-4 right-4 bg-navy px-3 py-1.5 text-ice"><Label>{d.region}</Label></span>
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-6">
                      <div>
                        <h2 className="display text-[clamp(2.4rem,4.5vw,4rem)] transition-transform duration-500 group-hover:translate-x-2">{d.name}</h2>
                        <p className="mt-2 max-w-sm text-navy/65">{d.tagline}</p>
                      </div>
                      <Label className="mt-3 shrink-0 text-right text-blue">{d.country}<br />{d.lat}</Label>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}