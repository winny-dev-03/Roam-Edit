// src/components/TechSection.jsx
import { TECH_LEAD, TECH_LIST, TECH_TOPICS } from "../data/content.js";
import Img from "./Img.jsx";
import Meta from "./ui/Meta.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";

export default function TechSection() {
  return (
    <section id="technology" className="section bg-night text-ivory">
      <div className="container-page">
        <SectionHeading eyebrow="Technology & Innovation" title="The builders shaping a continent" light action={{ label: "All technology", href: "#" }} />

        <div className="mb-10 flex flex-wrap gap-2">
          {TECH_TOPICS.map((t) => (
            <a key={t} href="#" className="border border-ivory/25 px-4 py-1.5 text-xs font-medium text-ivory/80 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-ivory">
              {t}
            </a>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <article className="group lg:col-span-7">
            <div className="img-zoom aspect-[16/10] overflow-hidden bg-ink">
              <Img src={TECH_LEAD.image} alt={TECH_LEAD.title} className="h-full w-full" />
            </div>
            <p className="eyebrow mb-3 mt-6 !text-[#E8A27C]">{TECH_LEAD.category}</p>
            <h3 className="headline-lg !text-ivory">{TECH_LEAD.title}</h3>
            <p className="mt-4 max-w-xl text-ivory/70">{TECH_LEAD.excerpt}</p>
            <div className="mt-4"><Meta author={TECH_LEAD.author} date={TECH_LEAD.date} readTime={TECH_LEAD.readTime} light /></div>
          </article>

          <div className="divide-y divide-ivory/15 border-t border-ivory/15 lg:col-span-5 lg:border-t-0">
            {TECH_LIST.map((t, i) => (
              <article key={t.title} className="group flex gap-5 py-6 first:pt-0 lg:first:pt-0">
                <span className="font-serif text-3xl text-terracotta/80">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="eyebrow mb-2 !text-[#E8A27C]">{t.category}</p>
                  <h4 className="font-serif text-lg leading-snug !text-ivory transition-colors group-hover:text-[#E8A27C] sm:text-xl">{t.title}</h4>
                  <div className="mt-2"><Meta author={t.author} date={t.date} light /></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}