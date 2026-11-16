// src/components/LatestStories.jsx
import { LATEST } from "../data/content.js";
import Img from "./Img.jsx";
import Meta from "./ui/Meta.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";

export default function LatestStories() {
  return (
    <section id="latest" className="section">
      <div className="container-page">
        <SectionHeading eyebrow="Latest Stories" title="Fresh from our writers" action={{ label: "View archive", href: "#" }} />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {LATEST.map((a) => (
            <article key={a.title} className="group">
              <div className="img-zoom aspect-[3/2] overflow-hidden bg-sand">
                <Img src={a.image} alt={a.title} className="h-full w-full" />
              </div>
              <p className="eyebrow mb-2 mt-5">{a.category}</p>
              <h3 className="headline-md transition-colors group-hover:text-terracotta">{a.title}</h3>
              <div className="mt-3"><Meta author={a.author} date={a.date} /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}