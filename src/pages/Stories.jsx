// src/pages/Stories.jsx
import { useState } from "react";
import { Link } from "react-router";
import { ARTICLES, AUTHORS, fmtDate, pad } from "../data/content.js";
import Img from "../components/Img.jsx";
import Reveal from "../components/Reveal.jsx";
import { Arrow, Chip, Label, Meta } from "../components/Ui.jsx";

const CATS = ["All", "Adventure", "Culture", "Design", "Food", "Technology"];

function Row({ a, n }) {
  const flip = n % 2 === 1;
  return (
    <Reveal>
      <Link to={`/stories/${a.slug}`} className="group grid items-center gap-6 lg:grid-cols-12">
        <div className={`relative lg:row-start-1 ${flip ? "lg:col-span-6 lg:col-start-7" : "lg:col-span-7 lg:col-start-1"}`}>
          <Img kind={a.kind} seed={a.seed} src={a.image} alt={a.title} className="aspect-[16/11]" />
          <span className="display absolute -top-[4.6rem] left-0 text-[7rem] leading-none text-navy/20">{pad(n + 1)}</span>
        </div>
        <div className={`relative z-10 bg-white p-7 shadow-[0_30px_60px_-40px_rgba(23,43,58,0.45)] lg:row-start-1 lg:p-10 ${flip ? "lg:col-span-6 lg:col-start-1 lg:-mr-24" : "lg:col-span-6 lg:col-start-7 lg:-ml-24 lg:translate-y-12"}`}>
          <Label className="text-blue">{a.category}{a.topic ? ` · ${a.topic}` : ""}</Label>
          <h2 className="display mt-3 text-[clamp(2rem,3.6vw,3.2rem)] transition-colors duration-300 group-hover:text-blue">{a.title}</h2>
          <p className="mt-4 leading-relaxed text-navy/70">{a.dek}</p>
          <div className="mt-6 flex items-center justify-between border-t border-navy/10 pt-4">
            <Meta className="text-navy/55" author={AUTHORS[a.author].name} read={a.read} />
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Stories() {
  const [cat, setCat] = useState("All");
  const [shown, setShown] = useState(4);
  const lead = ARTICLES[0];
  const rest = ARTICLES.slice(1).filter((a) => cat === "All" || a.category === cat);

  return (
    <>
      {/* Split lead */}
      <section className="relative pt-24 lg:pt-28">
        <div className="relative lg:pr-[28%]">
          <Link to={`/stories/${lead.slug}`} className="group block">
            <Img kind={lead.kind} seed={lead.seed} src={lead.image} alt={lead.title} eager className="h-[62svh] min-h-96 w-full lg:h-[78svh]" />
          </Link>
        </div>
        <div className="wrap relative -mt-24 lg:absolute lg:inset-x-0 lg:bottom-16 lg:mt-0 lg:flex lg:justify-end">
          <Reveal className="bg-white p-8 shadow-[0_40px_70px_-40px_rgba(23,43,58,0.5)] sm:p-12 lg:w-[46%] lg:max-w-2xl">
            <Label className="text-blue">Stories · Cover feature</Label>
            <h1 className="display mt-4 text-[clamp(2.8rem,5.4vw,5rem)]">{lead.title}</h1>
            <p className="mt-5 leading-relaxed text-navy/70">{lead.dek}</p>
            <Meta className="mt-6 text-navy/55" author={AUTHORS[lead.author].name} date={fmtDate(lead.date)} read={lead.read} />
            <Link to={`/stories/${lead.slug}`} className="mt-8 inline-flex items-center gap-3 bg-navy px-6 py-3.5 text-sm font-semibold text-ice transition-colors hover:bg-blue">Read the story <Arrow /></Link>
          </Reveal>
        </div>
      </section>

      {/* Filter */}
      <div className="wrap mt-24 flex flex-wrap items-center gap-3 border-b border-navy/15 pb-5 lg:mt-36">
        <Label className="mr-3 text-navy/50">Browse</Label>
        {CATS.map((c) => <Chip key={c} active={cat === c} onClick={() => { setCat(c); setShown(4); }}>{c}</Chip>)}
      </div>

      <section className="wrap space-y-28 py-24 lg:space-y-40 lg:py-32">
        {rest.slice(0, shown).map((a, n) => <Row key={a.slug} a={a} n={n} />)}
        {rest.length === 0 && <p className="display py-20 text-center text-5xl">No stories here yet.</p>}
        {shown < rest.length && (
          <div className="flex justify-center pt-8">
            <button onClick={() => setShown(shown + 3)} className="border border-navy px-9 py-4 text-sm font-semibold transition-colors hover:bg-navy hover:text-ice">
              Load more stories ({rest.length - shown})
            </button>
          </div>
        )}
      </section>
    </>
  );
}