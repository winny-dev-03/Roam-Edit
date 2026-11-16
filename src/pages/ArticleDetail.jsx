// src/pages/ArticleDetail.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { ARTICLES, AUTHORS, destBySlug, fmtDate } from "../data/content.js";
import Img from "../components/Img.jsx";
import { Arrow, Label, Meta } from "../components/Ui.jsx";
import NotFound from "./NotFound.jsx";

export default function ArticleDetail() {
  const { slug } = useParams();
  const a = ARTICLES.find((x) => x.slug === slug);
  const bodyRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const on = () => {
      const el = bodyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setProgress(Math.min(1, Math.max(0, (window.innerHeight * 0.4 - r.top) / (r.height - window.innerHeight * 0.2))));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [slug]);

  if (!a) return <NotFound />;

  const author = AUTHORS[a.author];
  const dest = destBySlug(a.dest);
  const related = ARTICLES.filter((x) => x.slug !== a.slug && (x.category === a.category || x.dest === a.dest)).slice(0, 3);
  const more = related.length >= 3 ? related : [...related, ...ARTICLES.filter((x) => x.slug !== a.slug && !related.includes(x))].slice(0, 3);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const enc = encodeURIComponent;
  const copy = async () => {
    try { await navigator.clipboard.writeText(url); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const shareBtn = "flex h-11 w-11 items-center justify-center border border-navy/25 text-[0.7rem] font-semibold transition-colors hover:bg-navy hover:text-ice";

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" aria-hidden="true">
        <div className="h-full origin-left bg-blue" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className="wrap pb-14 pt-32 lg:pt-40">
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/stories" className="flex items-center gap-2 text-sm font-semibold"><Arrow className="rotate-180" /> Stories</Link>
          <Label className="text-blue">{a.category}{a.topic ? ` · ${a.topic}` : ""}</Label>
        </div>
        <h1 className="display mt-8 max-w-6xl text-[clamp(3rem,9vw,8.5rem)]">{a.title}</h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <p className="display text-[clamp(1.5rem,2.6vw,2.2rem)] italic leading-[1.2] lg:col-span-7">{a.dek}</p>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="font-semibold">{author.name}</p>
            <p className="text-sm text-navy/60">{author.role}, {author.base}</p>
            <Meta className="mt-3 text-navy/55" date={fmtDate(a.date)} read={a.read} />
          </div>
        </div>
      </header>

      <figure className="wrap">
        <Img kind={a.kind} seed={a.seed} src={a.image} alt={a.title} eager className="aspect-[16/9] w-full lg:aspect-[21/9]" />
        <figcaption className="mt-3 flex justify-between"><Label className="text-navy/50">{dest ? `${dest.name}, ${dest.country}` : ""}</Label><Label className="text-navy/50">{dest ? `${dest.lat} · ${dest.lon}` : ""}</Label></figcaption>
      </figure>

      <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:py-28">
        {/* Share rail */}
        <aside className="lg:col-span-2">
          <div className="flex gap-2 lg:sticky lg:top-32 lg:flex-col">
            <Label className="mb-2 hidden text-navy/50 lg:block">Share</Label>
            <a className={shareBtn} href={`https://twitter.com/intent/tweet?text=${enc(a.title)}&url=${enc(url)}`} target="_blank" rel="noreferrer" aria-label="Share on X">X</a>
            <a className={shareBtn} href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">f</a>
            <a className={shareBtn} href={`https://wa.me/?text=${enc(`${a.title} ${url}`)}`} target="_blank" rel="noreferrer" aria-label="Share on WhatsApp">WA</a>
            <button onClick={copy} className={shareBtn} aria-label="Copy link">{copied ? "✓" : "∞"}</button>
          </div>
        </aside>

        {/* Body */}
        <article ref={bodyRef} className="lg:col-span-8 lg:col-start-4">
          {a.body.map((p, i) => (
            <div key={i}>
              <p className={`mb-8 max-w-2xl text-[1.2rem] leading-[1.85] text-navy/85 ${i === 0 ? "drop-cap" : ""}`}>{p}</p>
              {i === 0 && (
                <blockquote className="display my-16 border-l-2 border-blue pl-8 text-[clamp(2rem,4vw,3.4rem)] italic lg:-ml-16">
                  “{a.quote}”
                </blockquote>
              )}
              {i === 1 && (
                <figure className="my-16 lg:-mx-16">
                  <Img kind={a.kind} seed={a.seed + 50} alt="" className="aspect-[16/10]" />
                  <figcaption className="mt-3"><Label className="text-navy/50">Photograph: {AUTHORS.juma.name}</Label></figcaption>
                </figure>
              )}
            </div>
          ))}

          <div className="mt-16 flex items-center justify-between border-y border-navy/15 py-8">
            <div>
              <Label className="text-blue">Written by</Label>
              <p className="display mt-2 text-3xl">{author.name}</p>
              <p className="text-sm text-navy/60">{author.role} · {author.base}</p>
            </div>
            {dest && <Link to={`/destinations/${dest.slug}`} className="hidden items-center gap-2 text-sm font-semibold sm:flex">Explore {dest.name} <Arrow /></Link>}
          </div>
        </article>
      </div>

      {/* Related */}
      <section className="cut-top bg-white pb-24 pt-28 lg:pt-36">
        <div className="wrap">
          <Label className="text-blue">Keep reading</Label>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {more.map((r, i) => (
              <Link key={r.slug} to={`/stories/${r.slug}`} className={`group block ${i === 1 ? "md:mt-12" : ""}`}>
                <Img kind={r.kind} seed={r.seed} src={r.image} alt={r.title} className="aspect-[4/5]" />
                <Label className="mt-5 block text-blue">{r.category}</Label>
                <h3 className="display mt-2 text-[1.9rem] transition-colors group-hover:text-blue">{r.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}