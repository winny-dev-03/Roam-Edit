// src/components/FeaturedStories.jsx
import { FEATURED } from "../data/content.js";
import Img from "./Img.jsx";
import Meta from "./ui/Meta.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";

function LargeStory({ s }) {
  return (
    <article className="img-zoom group relative h-full min-h-[420px] overflow-hidden bg-night lg:min-h-[640px]">
      <Img src={s.image} alt={s.city} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="eyebrow mb-3 !text-[#E8A27C]">{s.city}</p>
        <h3 className="headline-lg max-w-xl !text-ivory">{s.title}</h3>
        <p className="mt-3 hidden max-w-lg text-ivory/75 sm:block">{s.excerpt}</p>
        <div className="mt-4"><Meta author={s.author} date={s.date} readTime={s.readTime} light /></div>
      </div>
    </article>
  );
}

function SideStory({ s }) {
  return (
    <article className="img-zoom group relative min-h-[300px] flex-1 overflow-hidden bg-night">
      <Img src={s.image} alt={s.city} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="eyebrow mb-2 !text-[#E8A27C]">{s.city}</p>
        <h3 className="headline-md !text-ivory">{s.title}</h3>
      </div>
    </article>
  );
}

function ColumnStory({ s }) {
  return (
    <article className="group">
      <div className="img-zoom aspect-[4/3] overflow-hidden bg-sand">
        <Img src={s.image} alt={s.city} className="h-full w-full" />
      </div>
      <p className="eyebrow mb-2 mt-5">{s.city}</p>
      <h3 className="headline-md transition-colors group-hover:text-terracotta">{s.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.excerpt}</p>
      <div className="mt-3"><Meta author={s.author} date={s.date} readTime={s.readTime} /></div>
    </article>
  );
}

export default function FeaturedStories() {
  const [lead, a, b, ...rest] = FEATURED;
  return (
    <section id="stories" className="section">
      <div className="container-page">
        <SectionHeading eyebrow="Featured Stories" title="Six cities. Endless reasons to go." action={{ label: "All stories", href: "#latest" }} />

        <div className="grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-7"><LargeStory s={lead} /></div>
          <div className="flex flex-col gap-5 lg:col-span-5">
            <SideStory s={a} />
            <SideStory s={b} />
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => <ColumnStory key={s.id} s={s} />)}
        </div>
      </div>
    </section>
  );
}