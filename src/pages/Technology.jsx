// src/pages/Technology.jsx
import { useState } from "react";
import { Link } from "react-router";
import { ARTICLES, AUTHORS, BRIEFS, STATS, TOOLS, TOPICS, fmtDate, pad } from "../data/content.js";
import Img from "../components/Img.jsx";
import Reveal from "../components/Reveal.jsx";
import { Arrow, CountUp, Label, Meta } from "../components/Ui.jsx";

export default function Technology() {
  const [topic, setTopic] = useState("All");
  const all = ARTICLES.filter((a) => a.category === "Technology");
  const list = all.filter((a) => topic === "All" || a.topic === topic);
  const briefs = BRIEFS.filter((b) => topic === "All" || b.topic === topic);
  const [lead, ...rest] = list;

  return (
    <>
      {/* Header with blinking cursor */}
      <header className="wrap pb-14 pt-32 lg:pt-40">
        <Label className="text-blue">Technology &amp; Innovation</Label>
        <div className="mt-5 grid items-end gap-8 lg:grid-cols-12">
          <h1 className="display text-[clamp(3.8rem,14vw,13rem)] lg:col-span-8">
            The <em>Signal</em><span className="animate-blink text-blue">_</span>
          </h1>
          <p className="max-w-sm text-lg leading-relaxed text-navy/70 lg:col-span-4">
            Start-ups, fintech, AI and the infrastructure underneath: reporting from the people building it.
          </p>
        </div>
      </header>

      {/* Ticker */}
      <div className="overflow-hidden border-y border-navy bg-white py-3">
        <div className="flex w-max animate-marquee gap-14 font-mono text-[0.72rem] uppercase tracking-[0.18em]">
          {[...BRIEFS, ...BRIEFS, ...BRIEFS, ...BRIEFS].map((b, i) => (
            <span key={i} className="flex items-center gap-4 whitespace-nowrap"><span className="text-blue">▲ {b.topic}</span>{b.text.split(",")[0].slice(0, 70)}</span>
          ))}
        </div>
      </div>

      <section className="wrap grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        {/* Topic rail */}
        <aside className="min-w-0 lg:col-span-2">
          <div className="lg:sticky lg:top-28">
            <Label className="text-navy/50">Topic</Label>
            <ul className="no-scrollbar mt-4 flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
              {TOPICS.map((t) => (
                <li key={t}>
                  <button
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={`flex w-full items-center gap-3 whitespace-nowrap border-navy/15 px-3 py-2 text-left transition-colors lg:border-b lg:px-0 lg:py-3 ${topic === t ? "text-navy" : "text-navy/45 hover:text-navy"}`}
                  >
                    <span className={`h-2 w-2 shrink-0 transition-colors ${topic === t ? "bg-blue" : "bg-transparent"}`} />
                    <span className="display text-2xl">{t}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Stories */}
        <div className="min-w-0 lg:col-span-10">
          {lead ? (
            <Reveal key={lead.slug}>
              <Link to={`/stories/${lead.slug}`} className="group relative block">
                <Img kind={lead.kind} seed={lead.seed} src={lead.image} alt={lead.title} className="aspect-[16/9]" />
                <div className="relative z-10 -mt-12 ml-auto w-[92%] bg-navy p-7 text-ice sm:p-10 lg:-mt-24 lg:w-[62%]">
                  <Label className="text-blue">{lead.topic} · Lead</Label>
                  <h2 className="display mt-3 text-[clamp(2rem,4vw,3.6rem)]">{lead.title}</h2>
                  <p className="mt-4 text-ice/70">{lead.dek}</p>
                  <Meta className="mt-5 text-ice/50" author={AUTHORS[lead.author].name} date={fmtDate(lead.date)} read={lead.read} />
                </div>
              </Link>
            </Reveal>
          ) : (
            <p className="display text-4xl text-navy/50">No stories under this topic yet.</p>
          )}

          <ol className="mt-20 divide-y divide-navy/15 border-y border-navy/15">
            {rest.map((a, i) => (
              <li key={a.slug}>
                <Link to={`/stories/${a.slug}`} className="group grid grid-cols-[3rem_1fr] items-center gap-5 py-8 sm:grid-cols-[4.5rem_1fr_9rem]">
                  <span className="display text-5xl text-blue">{pad(i + 2)}</span>
                  <div>
                    <Label className="text-blue">{a.topic}</Label>
                    <h3 className="display mt-1 text-[clamp(1.7rem,3vw,2.6rem)] transition-transform duration-500 group-hover:translate-x-2">{a.title}</h3>
                    <p className="mt-2 hidden max-w-xl text-sm text-navy/60 md:block">{a.dek}</p>
                  </div>
                  <Img kind={a.kind} seed={a.seed} src={a.image} alt="" className="hidden aspect-[4/3] sm:block" />
                </Link>
              </li>
            ))}
          </ol>

          {briefs.length > 0 && (
            <div className="mt-20">
              <Label className="text-blue">In brief</Label>
              <div className="mt-6 grid gap-x-10 border-t border-navy md:grid-cols-2">
                {briefs.map((b, i) => (
                  <p key={i} className="flex gap-4 border-b border-navy/15 py-5 leading-relaxed">
                    <Label className="mt-1 shrink-0 text-blue">{b.topic}</Label>{b.text}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tools */}
      <section className="cut-top bg-white pb-24 pt-28 lg:pt-36">
        <div className="wrap">
          <Label className="text-blue">Reviews &amp; insights</Label>
          <h2 className="display mt-4 text-[clamp(2.6rem,6vw,5.4rem)]">Kit we <em>actually</em> carry.</h2>
          <ul className="mt-12 border-t border-navy">
            {TOOLS.map((t) => (
              <li key={t.name} className="grid items-center gap-4 border-b border-navy/15 py-6 md:grid-cols-12">
                <span className="display text-3xl md:col-span-3">{t.name}</span>
                <Label className="text-navy/50 md:col-span-2">{t.cat}</Label>
                <div className="md:col-span-3">
                  <div className="h-1.5 w-full bg-navy/10"><Reveal className="h-full bg-navy" style={{ width: `${t.score}%` }} /></div>
                </div>
                <span className="display text-3xl md:col-span-1">{t.score}</span>
                <p className="text-sm leading-snug text-navy/65 md:col-span-3">{t.verdict}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* By the numbers */}
      <section className="bg-navy py-24 text-ice">
        <div className="wrap grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="border-t border-ice/30 pt-6">
              <p className="display text-[clamp(4rem,8vw,7rem)]"><CountUp to={s.n} suffix={s.s} /></p>
              <Label className="text-ice/60">{s.l}</Label>
            </div>
          ))}
        </div>
        <div className="wrap mt-16"><Link to="/contact" className="inline-flex items-center gap-3 text-sm font-semibold">Pitch us a technology story <Arrow /></Link></div>
      </section>
    </>
  );
}