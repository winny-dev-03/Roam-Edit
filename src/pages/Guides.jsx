// src/pages/Guides.jsx
import { useEffect, useState } from "react";
import { GUIDES, PACKING, pad } from "../data/content.js";
import Img from "../components/Img.jsx";
import Reveal from "../components/Reveal.jsx";
import { Chip, Label, PageHeader } from "../components/Ui.jsx";

const TYPES = ["All", "Route", "Essentials", "City", "Tech"];
const KEY = "roamedit-packing";

function Checklist() {
  const [done, setDone] = useState({});

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem(KEY)) || {}); } catch { /* storage unavailable */ }
  }, []);
  const save = (next) => {
    setDone(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const total = PACKING.reduce((n, g) => n + g.items.length, 0);
  const count = Object.values(done).filter(Boolean).length;
  const pct = count / total;
  const C = 2 * Math.PI * 54;

  return (
    <section className="cut-top bg-white pb-24 pt-28 lg:pt-36">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Label className="text-blue">Interactive · Guide 02</Label>
            <h2 className="display mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">Packing for <em>four climates.</em></h2>
            <div className="mt-10 flex items-center gap-6">
              <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90" aria-hidden="true">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#172B3A" strokeOpacity=".12" strokeWidth="6" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#172B3A" strokeWidth="6" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} className="transition-[stroke-dashoffset] duration-700" />
              </svg>
              <div>
                <p className="display text-5xl">{count}<span className="text-navy/30">/{total}</span></p>
                <Label className="text-navy/55">{pct === 1 ? "Ready to go" : "Packed"}</Label>
              </div>
            </div>
            <button onClick={() => save({})} className="mt-8 text-sm font-semibold underline underline-offset-4">Reset list</button>
          </div>
        </div>
        <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {PACKING.map((g) => (
            <div key={g.group}>
              <Label className="text-blue">{g.group}</Label>
              <ul className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
                {g.items.map((it) => {
                  const on = !!done[it];
                  return (
                    <li key={it}>
                      <label className="flex cursor-pointer items-start gap-4 py-4">
                        <input type="checkbox" checked={on} onChange={() => save({ ...done, [it]: !on })} className="peer sr-only" />
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-blue ${on ? "border-navy bg-navy text-ice" : "border-navy/40"}`}>
                          {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5 9-10" /></svg>}
                        </span>
                        <span className={`transition-all duration-300 ${on ? "text-navy/35 line-through" : ""}`}>{it}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Guides() {
  const [type, setType] = useState("All");
  const [open, setOpen] = useState(GUIDES[0].slug);
  const list = GUIDES.filter((g) => type === "All" || g.type === type);

  return (
    <>
      <PageHeader label="Field guides · Tested on the road" intro="Practical, opinionated and short enough to read on a bus. Tap a guide to see what's inside.">
        Field <em>guides.</em>
      </PageHeader>

      <Checklist />

      <section className="wrap py-24 lg:py-32">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          {TYPES.map((t) => <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>)}
          <Label className="ml-auto text-navy/50">{list.length} guides</Label>
        </div>

        <ul className="border-t border-navy/15">
          {list.map((g, i) => {
            const isOpen = open === g.slug;
            return (
              <Reveal as="li" key={g.slug} className="border-b border-navy/15">
                <button onClick={() => setOpen(isOpen ? null : g.slug)} aria-expanded={isOpen} className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-8 text-left sm:grid-cols-[5rem_1fr_auto_auto]">
                  <span className="display text-4xl text-blue">{pad(i + 1)}</span>
                  <span className="display text-[clamp(1.8rem,3.6vw,3.2rem)] transition-transform duration-500 group-hover:translate-x-2">{g.title}</span>
                  <span className="hidden text-right sm:block"><Label className="block text-blue">{g.type}</Label><Label className="text-navy/55">{g.time} · {g.level}</Label></span>
                  <span className={`flex h-10 w-10 items-center justify-center border border-navy/30 text-xl transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="grid gap-10 pb-12 md:grid-cols-12">
                      <Img kind={g.kind} seed={g.seed} alt={g.title} className="aspect-[4/3] md:col-span-5" />
                      <div className="md:col-span-7">
                        <p className="max-w-lg text-lg leading-relaxed text-navy/75">{g.desc}</p>
                        <ol className="mt-6 space-y-3">
                          {g.steps.map((s, n) => (
                            <li key={s} className="flex gap-4 border-t border-navy/10 pt-3"><Label className="mt-1 text-blue">{pad(n + 1)}</Label><span>{s}</span></li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </section>
    </>
  );
}