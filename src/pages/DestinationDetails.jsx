// src/pages/DestinationDetail.jsx
import { useState } from "react";
import { Link, useParams } from "react-router";
import { ARTICLES, AUTHORS, DESTINATIONS, pad } from "../data/content.js";
import Img from "../components/Img.jsx";
import Reveal from "../components/Reveal.jsx";
import { Arrow, Label, Meta } from "../components/Ui.jsx";
import NotFound from "./NotFound.jsx";

export default function DestinationDetail() {
  const { slug } = useParams();
  const i = DESTINATIONS.findIndex((d) => d.slug === slug);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  if (i < 0) return <NotFound />;

  const d = DESTINATIONS[i];
  const next = DESTINATIONS[(i + 1) % DESTINATIONS.length];
  const related = ARTICLES.filter((a) => a.dest === d.slug);
  const stories = (related.length ? related : ARTICLES.slice(0, 2)).slice(0, 2);

  const copy = async () => {
    try { await navigator.clipboard.writeText(window.location.href); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const facts = [["Best time", d.bestTime], ["Getting there", d.getting], ["Where to stay", d.stay], ["Budget", d.budget]];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92svh] overflow-hidden bg-navy text-ice">
        <Img kind={d.kind} seed={d.seed} src={d.image} alt={d.name} eager className="absolute inset-0 animate-drift" />
        <div className="absolute inset-0 bg-linear-to-b from-navy/55 via-transparent to-navy/80" />
        <div className="wrap relative flex min-h-[92svh] flex-col justify-end pb-14 pt-32">
          <Label className="text-ice/80">{d.region} · {d.country}</Label>
          <h1 className="display mt-4 text-[clamp(4.2rem,17vw,16rem)] leading-[0.82]">{d.name}</h1>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="display max-w-xl text-[clamp(1.5rem,3vw,2.4rem)] italic">{d.tagline}</p>
            <Label className="text-ice/80">{d.lat} · {d.lon}</Label>
          </div>
        </div>
      </section>

      <section className="wrap grid gap-16 py-24 lg:grid-cols-12 lg:py-32">
        {/* MAIN */}
        <div className="lg:col-span-8">
          <Reveal>
            <Label className="text-blue">Why go</Label>
            <p className="drop-cap mt-6 max-w-2xl text-xl leading-[1.7] text-navy/80">{d.blurb} It rewards the traveller who arrives without a list, stays a little longer than planned and says yes to the second invitation.</p>
          </Reveal>

          <div className="mt-24">
            <Label className="text-blue">Do</Label>
            <ol className="mt-8 divide-y divide-navy/15 border-y border-navy/15">
              {d.dos.map((x, n) => (
                <Reveal as="li" key={x.t} delay={n * 80} className="grid grid-cols-[4.5rem_1fr] items-start gap-6 py-10 sm:grid-cols-[7rem_1fr]">
                  <span className="display text-[4.5rem] leading-none text-blue sm:text-[6rem]">{pad(n + 1)}</span>
                  <div>
                    <h3 className="display text-[clamp(1.8rem,3.4vw,2.8rem)]">{x.t}</h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-navy/70">{x.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal className="my-24 bg-navy p-8 text-ice sm:p-14">
            <Label className="text-blue">Eat</Label>
            <p className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)]">{d.eat}</p>
          </Reveal>

          {/* Overlapping gallery */}
          <div className="grid gap-5 md:grid-cols-12">
            <Reveal className="md:col-span-7"><Img kind={d.kind} seed={d.seed + 40} alt={`${d.name} gallery 1`} className="aspect-[4/3]" /></Reveal>
            <Reveal delay={120} className="md:col-span-5 md:mt-20"><Img kind={d.kind} seed={d.seed + 41} alt={`${d.name} gallery 2`} className="aspect-[3/4]" /></Reveal>
            <Reveal delay={200} className="md:col-span-6 md:col-start-3 md:-mt-24"><Img kind={d.kind} seed={d.seed + 42} alt={`${d.name} gallery 3`} className="aspect-[16/10] border-[10px] border-ice" /></Reveal>
          </div>
        </div>

        {/* AT A GLANCE */}
        <aside className="lg:col-span-4">
          <div className="bg-white p-8 lg:sticky lg:top-28">
            <Label className="text-blue">At a glance</Label>
            <dl className="mt-6 divide-y divide-navy/10">
              {facts.map(([k, v]) => (
                <div key={k} className="py-4">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-navy/50">{k}</dt>
                  <dd className="mt-1.5 leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button onClick={() => setSaved(!saved)} aria-pressed={saved} className={`border px-4 py-3 text-sm font-semibold transition-colors ${saved ? "border-navy bg-navy text-ice" : "border-navy/30 hover:border-navy"}`}>
                {saved ? "Saved ✓" : "Save"}
              </button>
              <button onClick={copy} className="border border-navy/30 px-4 py-3 text-sm font-semibold transition-colors hover:border-navy">
                {copied ? "Link copied" : "Share"}
              </button>
            </div>
          </div>
        </aside>
      </section>

      {/* STORIES */}
      <section className="wrap pb-24">
        <Label className="text-blue">Stories from here</Label>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {stories.map((a) => (
            <Link key={a.slug} to={`/stories/${a.slug}`} className="group grid grid-cols-5 items-center gap-6">
              <Img kind={a.kind} seed={a.seed} src={a.image} alt={a.title} className="col-span-2 aspect-[3/4]" />
              <div className="col-span-3">
                <Label className="text-blue">{a.category}</Label>
                <h3 className="display mt-2 text-[2rem] transition-colors group-hover:text-blue">{a.title}</h3>
                <Meta className="mt-3 text-navy/50" author={AUTHORS[a.author].name} read={a.read} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEXT */}
      <Link to={`/destinations/${next.slug}`} className="group relative block overflow-hidden bg-navy text-ice">
        <Img kind={next.kind} seed={next.seed} src={next.image} alt="" className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-70" />
        <div className="wrap relative flex flex-wrap items-end justify-between gap-6 py-24 lg:py-36">
          <div>
            <Label className="text-ice/70">Next destination</Label>
            <p className="display mt-3 text-[clamp(3.6rem,13vw,12rem)] leading-[0.85]">{next.name}</p>
          </div>
          <span className="flex h-20 w-20 items-center justify-center border border-ice/60 transition-colors group-hover:bg-ice group-hover:text-navy"><Arrow /></span>
        </div>
      </Link>
    </>
  );
}