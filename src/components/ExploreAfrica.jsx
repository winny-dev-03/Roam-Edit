// src/components/ExploreAfrica.jsx
import { COUNTRIES } from "../data/content.js";
import Img from "./Img.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";

export default function ExploreAfrica() {
  return (
    <section id="explore" className="section bg-paper">
      <div className="container-page">
        <SectionHeading eyebrow="Explore Africa" title="Find your next destination" action={{ label: "All countries", href: "#" }} />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {COUNTRIES.map((c, i) => (
            <a
              key={c.name}
              href="#"
              className={`img-zoom group relative block overflow-hidden bg-night ${i % 4 === 0 ? "aspect-[3/4] lg:aspect-[4/5]" : "aspect-[3/4]"}`}
            >
              <Img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                <h3 className="font-serif text-2xl font-medium !text-ivory sm:text-3xl">{c.name}</h3>
                <p className="mt-1 text-xs text-ivory/75 sm:text-sm">{c.highlight}</p>
                <span className="mt-3 block h-px w-8 bg-terracotta transition-all duration-300 group-hover:w-16" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}