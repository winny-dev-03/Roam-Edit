
import { useEffect, useRef, useState } from "react";
import { AUTHORS, pad } from "../data/content.js";
import Img from "../components/Img.jsx";
import Reveal from "../components/Reveal.jsx";
import { CountUp, Label, TextLink } from "../components/Ui.jsx";

const MANIFESTO =
  "The world is not a checklist of places to complete. It is a collection of stories waiting to be discovered. We publish thoughtful, beautifully told stories about destinations, cultures, people and ideas that make exploring the world meaningful.";

const PRINCIPLES = [
  {
    t: "Look beyond",
    d: "There is always more to a place than its famous landmarks. We look closer, explore further and find the stories that deserve to be told.",
  },
  {
    t: "People first",
    d: "Travel is about more than where you go. It is about the people you meet, the cultures you experience and the perspectives you bring home.",
  },
  {
    t: "Beautiful, then useful",
    d: "A story should inspire you to explore, but it should also give you something useful to take along the way.",
  },
  {
    t: "Independent",
    d: "We value honest perspectives, thoughtful recommendations and stories told with curiosity rather than commercial influence.",
  },
];

const TIMELINE = [
  ["2019", "The first Roam Edit stories take shape"],
  ["2021", "Our travel coverage expands across borders"],
  ["2023", "The Signal launches, exploring travel technology"],
  ["2025", "Our Field Guides become a reader favourite"],
  ["2026", "A new chapter of global stories and discoveries"],
];

// Words light up as you scroll through the manifesto.
function Manifesto() {
  const ref = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const on = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;

      const v = window.innerHeight;

      setP(
        Math.min(
          1,
          Math.max(0, (v * 0.85 - r.top) / (r.height + v * 0.25))
        )
      );
    };

    on();

    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);

    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const words = MANIFESTO.split(" ");

  return (
    <p
      ref={ref}
      className="display text-[clamp(2.3rem,5.8vw,5.4rem)] leading-[1.03]"
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="transition-colors duration-500"
          style={{
            color:
              i / words.length < p
                ? "#172B3A"
                : "rgba(119,153,181,0.4)",
          }}
        >
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

export default function About() {
  const people = Object.values(AUTHORS);

  return (
    <>
      {/* INTRODUCTION */}
      <header className="wrap pb-24 pt-32 lg:pt-44">
        <Label className="text-blue">About Roam Edit</Label>

        <div className="mt-8">
          <Manifesto />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-navy/15 pt-6">
          <p className="max-w-md text-sm leading-relaxed text-navy/65">
            An independent travel and technology publication for curious
            minds, thoughtful travellers and people who want to see more
            of the world.
          </p>

          <Label className="text-blue">
            Travel · Culture · Technology · Discovery
          </Label>
        </div>
      </header>

      {/* OUR PROMISE */}
      <section className="wrap relative pb-32">
        <Img
          kind="coast"
          seed={41}
          src="/images/about-banner.jpg"
          alt="A beautiful expansive coastline"
          className="aspect-[16/8] w-full"
        />

        <Reveal className="relative z-10 -mt-14 ml-auto w-[92%] bg-navy p-8 text-ice sm:p-12 lg:absolute lg:-bottom-4 lg:left-24 lg:ml-0 lg:mt-0 lg:w-[30rem]">
          <Label className="text-blue">Our promise</Label>

          <p className="display mt-3 text-4xl">
            Fewer headlines. <em>Longer looks.</em>
          </p>

          <p className="mt-5 text-sm leading-relaxed text-ice/70">
            We believe the best travel stories are not always about
            going somewhere new. Sometimes, they are about seeing
            somewhere familiar in a completely different way.
          </p>
        </Reveal>
      </section>

      {/* WHAT WE BELIEVE */}
      <section className="wrap pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label className="text-blue">What we believe</Label>

            <h2 className="display mt-4 text-[clamp(2.8rem,6vw,5rem)]">
              Our way of <em>seeing the world.</em>
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-relaxed text-navy/60">
            The ideas behind every story we publish and every journey
            we encourage.
          </p>
        </div>

        <div className="mt-10 grid gap-x-16 gap-y-4 md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal
              key={p.t}
              delay={i * 80}
              className={`border-t border-navy pt-6 ${
                i % 2 ? "md:mt-24" : ""
              }`}
            >
              <span className="display text-6xl text-blue">
                {pad(i + 1)}
              </span>

              <h2 className="display mt-4 text-[clamp(2.2rem,4vw,3.4rem)]">
                {p.t}
              </h2>

              <p className="mt-4 max-w-md leading-relaxed text-navy/70">
                {p.d}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUR COVERAGE */}
      <section className="cut-top bg-white py-32 lg:py-44">
        <div className="wrap grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Label className="text-blue">A world of stories</Label>

            <h2 className="display mt-5 text-[clamp(2.8rem,6vw,5.5rem)]">
              Everywhere has a story.
            </h2>

            <p className="mt-7 max-w-lg text-lg leading-relaxed text-navy/70">
              From the quiet streets of Kyoto to the coastlines of
              Portugal, from the energy of New York to the landscapes
              of Patagonia, we explore the places, people and ideas
              that make our world worth discovering.
            </p>

            <div className="mt-8">
              <TextLink to="/destinations">
                Explore our destinations
              </TextLink>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
            <Img
              kind="peaks"
              seed={26}
              src="/images/about-world.jpg"
              alt="An expansive mountain landscape"
              className="aspect-[4/5] w-full"
            />
          </Reveal>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="cut-top bg-white pb-28 pt-10">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label className="text-blue">The people behind the stories</Label>

              <h2 className="display mt-4 text-[clamp(2.8rem,6vw,5rem)]">
                Meet the <em>desk.</em>
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-navy/60">
              Curious minds, creative voices and people who believe
              there is always more to discover.
            </p>
          </div>

          <ul className="mt-10 border-t border-navy">
            {people.map((p) => (
              <li
                key={p.name}
                className="group grid items-baseline gap-2 border-b border-navy/15 py-7 transition-colors hover:bg-ice md:grid-cols-12 md:px-4"
              >
                <span className="display text-[clamp(2rem,4.2vw,3.6rem)] transition-transform duration-500 group-hover:translate-x-3 md:col-span-6">
                  {p.name}
                </span>

                <Label className="text-blue md:col-span-3">
                  {p.role}
                </Label>

                <Label className="text-navy/55 md:col-span-3 md:text-right">
                  {p.base}
                </Label>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="wrap py-28 lg:py-36">
        <Label className="text-blue">The Roam Edit story</Label>

        <h2 className="display mt-5 max-w-3xl text-[clamp(2.8rem,6vw,5.5rem)]">
          A little curiosity can take you <em>anywhere.</em>
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy/70">
          What began as a passion for discovering places and sharing
          stories has grown into a publication exploring the
          relationship between travel, culture and technology.
          And this is only the beginning.
        </p>

        <ol className="mt-12 grid gap-10 border-t border-navy pt-10 md:grid-cols-5">
          {TIMELINE.map(([y, t]) => (
            <Reveal as="li" key={y}>
              <p className="display text-5xl">{y}</p>

              <p className="mt-3 text-sm leading-relaxed text-navy/65">
                {t}
              </p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-24 grid items-end gap-10 md:grid-cols-12">
          <p className="display text-[clamp(2.6rem,6vw,5.2rem)] md:col-span-8">
            <CountUp to={640} suffix="+" /> stories,{" "}
            <em>and counting.</em>
          </p>

          <div className="md:col-span-4 md:text-right">
            <TextLink to="/contact">
              Write for Roam Edit
            </TextLink>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-navy py-28 text-ice lg:py-36">
        <div className="wrap">
          <Label className="text-blue">Keep exploring</Label>

          <h2 className="display mt-5 max-w-4xl text-[clamp(3rem,8vw,8rem)]">
            The world is waiting. <em>Where to next?</em>
          </h2>

          <div className="mt-10">
            <TextLink to="/destinations">
              Find your next destination
            </TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
