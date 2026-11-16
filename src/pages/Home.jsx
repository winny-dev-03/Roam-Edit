
// src/pages/Home.jsx
import { useRef, useState } from "react";
import { Link } from "react-router";
import {
  ARTICLES,
  AUTHORS,
  DESTINATIONS,
  GUIDES,
  STATS,
  fmtDate,
  pad,
} from "../data/content.js";
import Img from "../components/Img.jsx";
import Scene from "../components/Scene.jsx";
import Reveal from "../components/Reveal.jsx";
import { Arrow, CountUp, Label, TextLink } from "../components/Ui.jsx";

function Stamp({ className = "" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="100" fill="#F3F7FA" />
      <g className="origin-center animate-turn">
        <defs>
          <path
            id="stamp-path"
            d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0"
          />
        </defs>
        <text
          fill="#172B3A"
          fontFamily="DM Mono, monospace"
          fontSize="12"
        >
          <textPath
            href="#stamp-path"
            textLength="470"
            lengthAdjust="spacing"
          >
            ROAM EDIT • FIELD-TESTED • NO BUCKET LISTS •
          </textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="42" fill="#172B3A" />
      <path
        d="M100 68 L106 94 L132 100 L106 106 L100 132 L94 106 L68 100 L94 94 Z"
        fill="#7799B5"
      />
    </svg>
  );
}

function Ticket({ g, offset = "" }) {
  if (!g) return null;

  return (
    <Reveal className={offset}>
      <Link to="/guides" className="group relative block bg-white">
        <Img
          kind={g.kind}
          seed={g.seed}
          alt={g.title}
          className="aspect-[4/3]"
        />

        <div className="relative px-6 pb-7 pt-8">
          <span className="absolute -left-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-ice" />
          <span className="absolute -right-3 top-0 h-6 w-6 -translate-y-1/2 rounded-full bg-ice" />
          <span className="absolute inset-x-5 top-0 border-t border-dashed border-navy/25" />

          <Label className="text-blue">
            {g.type} · {g.time}
          </Label>

          <h3 className="display mt-3 text-[2rem]">{g.title}</h3>

          <p className="mt-3 text-sm leading-relaxed text-navy/65">
            {g.desc}
          </p>

          <span className="mt-6 flex items-center justify-between border-t border-navy/10 pt-4 text-sm font-semibold">
            {g.level}
            <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function ArticleMeta({ article }) {
  const author = AUTHORS[article.author];

  return (
    <p className="mt-3 text-xs uppercase tracking-[0.13em] text-navy/50">
      {article.category}
      {author?.name ? ` · ${author.name}` : ""}
      {article.read ? ` · ${article.read} min read` : ""}
    </p>
  );
}

export default function Home() {
  const rail = useRef(null);
  const [hover, setHover] = useState(ARTICLES[0]?.slug);
  const [form, setForm] = useState({ name: "", email: "" });
  const [sent, setSent] = useState(false);

  const cover = ARTICLES[0];
  const preview = ARTICLES.find((a) => a.slug === hover) || cover;

  const stories = ARTICLES.slice(0, 7);
  const tech = ARTICLES.filter((a) => a.category === "Technology");
  const journal = ARTICLES.filter((a) => a.category !== "Technology").slice(2, 5);
  const featuredStories = ARTICLES.slice(0, 4);
  const destinations = DESTINATIONS.slice(0, 6);

  const scrollRail = (dir) => {
    rail.current?.scrollBy({
      left: dir * 400,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="relative min-h-[100svh] overflow-hidden bg-navy text-ice">
          <Img
            src="/images/Hello.jpg"
            kind="dunes"
            seed={7}
            alt="A dramatic landscape at first light"
            eager
            className="absolute inset-0 animate-drift"
          />

          <div className="absolute inset-0 bg-linear-to-b from-navy/60 via-navy/5 to-navy/80" />

          <div className="wrap relative flex min-h-[100svh] flex-col justify-between pb-24 pt-28 lg:pb-36">
            <div className="flex justify-between text-ice/80">
              <Label>Issue 07 · The Art of Getting Lost</Label>
              <Label className="hidden sm:block">
                A magazine for the curious
              </Label>
            </div>

            <div>
              <Label className="mb-6 block text-ice/75">
                Travel differently. See more.
              </Label>

              <h1 className="display text-[clamp(3.8rem,13.5vw,12.5rem)]">
                Go where
                <br />
                <em>the map</em>{" "}
                <span className="whitespace-nowrap">goes quiet.</span>
              </h1>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-ice/85">
                Stories, places and ideas for people who want to experience
                more of the world — one thoughtful journey at a time.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/destinations"
                  className="bg-ice px-7 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-white"
                >
                  Explore the world
                </Link>

                <Link
                  to="/stories"
                  className="border border-ice/60 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-ice hover:text-navy"
                >
                  Read our stories
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 rotate-90 lg:block">
            <Label className="text-ice/70">Scroll ↓</Label>
          </div>
        </div>

        {/* FEATURED STORY */}
        {cover && (
          <Link
            to={`/stories/${cover.slug}`}
            className="group relative z-10 mx-5 -mt-20 block bg-white p-5 shadow-[0_40px_70px_-35px_rgba(23,43,58,0.5)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgba(23,43,58,0.6)] sm:mx-8 lg:absolute lg:bottom-0 lg:right-14 lg:mx-0 lg:mt-0 lg:w-[27rem] lg:translate-y-1/2"
          >
            <div className="relative overflow-hidden">
              <Img
                kind={cover.kind}
                seed={cover.seed}
                src="/images/Slow-T.jpg"
                alt={cover.title}
                className="aspect-[16/9] transition-transform duration-700 group-hover:scale-[1.03]"
              />

              <span className="absolute left-4 top-4 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
                Editor's pick
              </span>
            </div>

            <Label className="mt-5 block text-blue">
              {cover.category} · {cover.read} min read
            </Label>

            <h2 className="display mt-3 text-[2.1rem] leading-tight">
              {cover.title}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-navy/65">
              {cover.excerpt || "A story worth taking your time over."}
            </p>

            <span className="mt-5 flex items-center justify-between border-t border-navy/10 pt-4 text-sm font-semibold">
              Explore the story
              <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>
        )}
      </section>

      {/* DESTINATION MARQUEE */}
      <div className="mt-14 overflow-hidden border-y border-navy/15 py-5 lg:mt-52">
        <div className="flex w-max animate-marquee gap-12">
          {[...DESTINATIONS, ...DESTINATIONS].map((d, i) => (
            <Link
              key={`${d.slug}-${i}`}
              to={`/destinations/${d.slug}`}
              className="flex items-center gap-5 whitespace-nowrap"
            >
              <span className="display text-4xl transition-colors hover:text-blue">
                {d.name}
              </span>
              <Label className="text-blue">
                {d.country}
              </Label>
              <span className="text-blue">✦</span>
            </Link>
          ))}
        </div>
      </div>

      {/* EDITOR'S LETTER */}
      <section className="wrap pb-10 pt-28 lg:pt-40">
        <div className="grid items-center gap-20 lg:grid-cols-12">
          <Reveal className="relative lg:col-span-5">
            <Img
              kind="peaks"
              seed={11}
             src="/images/Editors-pick.jpg"
              alt="A mountain ridge at dawn"
              className="aspect-[4/5] w-[86%]"
            />

            <Img
              kind="coast"
              seed={4}
              src="/images/Sub-EP.jpg"
              alt="A quiet coastline"
              className="absolute -bottom-12 right-0 aspect-[4/3] w-[56%] border-[10px] border-ice"
            />

            <Stamp className="absolute -top-8 right-2 h-28 w-28 lg:-right-4 lg:h-36 lg:w-36" />
          </Reveal>

          <Reveal
            className="lg:col-span-6 lg:col-start-7"
            delay={120}
          >
            <Label className="text-blue">A note from the editor</Label>

            <h2 className="display mt-5 text-[clamp(2.8rem,6vw,5.6rem)]">
              We don't do <em>bucket lists.</em>
            </h2>

            <p className="drop-cap mt-8 max-w-xl text-lg leading-[1.75] text-navy/75">
              The world is too interesting to be reduced to a checklist.
              There are places that stay with you, conversations that change
              your perspective and little discoveries that never make it
              into a travel guide.
            </p>

            <p className="mt-6 max-w-xl text-lg leading-[1.75] text-navy/75">
              Roam Edit is for the curious traveller. We tell stories,
              explore cultures, find useful tools and look at the world
              from a different angle.
            </p>

            <div className="mt-8 flex items-center gap-8">
              <p className="display text-3xl italic">The Roam Edit Team</p>
              <TextLink to="/about">Our manifesto</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STORIES FROM EVERYWHERE */}
      <section className="relative overflow-hidden pb-32 pt-32 lg:pt-44">
        <div className="wrap">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label className="text-blue">Stories from everywhere</Label>
              <h2 className="display mt-4 max-w-3xl text-[clamp(3rem,7vw,6.8rem)]">
                The world has
                <br />
                <em>a story to tell.</em>
              </h2>
            </div>

            <TextLink to="/stories">Explore all stories</TextLink>
          </div>

          {featuredStories.length > 0 && (
            <div className="grid gap-12 lg:grid-cols-12">
              {/* MAIN FEATURE */}
              <Reveal className="group lg:col-span-7">
                <Link to={`/stories/${featuredStories[0].slug}`}>
                  <div className="relative overflow-hidden">
                    <Img
                      kind={featuredStories[0].kind}
                      seed={featuredStories[0].seed}
                      src={featuredStories[0].image}
                      alt={featuredStories[0].title}
                      className="aspect-[5/4] transition-transform duration-1000 group-hover:scale-[1.035]"
                    />

                    <span className="absolute bottom-5 left-5 bg-ice px-4 py-2">
                      <Label className="text-navy">Featured story</Label>
                    </span>
                  </div>

                  <ArticleMeta article={featuredStories[0]} />

                  <h3 className="display mt-4 max-w-3xl text-[clamp(2.5rem,5vw,4.8rem)] leading-[1.05] transition-colors group-hover:text-blue">
                    {featuredStories[0].title}
                  </h3>

                  <p className="mt-4 max-w-xl text-base leading-relaxed text-navy/65">
                    {featuredStories[0].excerpt ||
                      "A closer look at the places, people and experiences shaping the way we see the world."}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-4 text-sm font-semibold">
                    Read the story
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </Reveal>

              {/* SMALLER STORIES */}
              <div className="flex flex-col justify-between gap-10 lg:col-span-5">
                {featuredStories.slice(1, 4).map((a, i) => (
                  <Reveal key={a.slug} delay={i * 100}>
                    <Link
                      to={`/stories/${a.slug}`}
                      className="group grid grid-cols-[7.5rem_1fr] gap-5 border-b border-navy/15 pb-8 sm:grid-cols-[10rem_1fr]"
                    >
                      <Img
                        kind={a.kind}
                        seed={a.seed}
                        src={a.image}
                        alt={a.title}
                        className="aspect-[4/5]"
                      />

                      <div className="py-1">
                        <Label className="text-blue">{a.category}</Label>

                        <h3 className="display mt-3 text-[1.65rem] leading-tight transition-colors group-hover:text-blue sm:text-[2rem]">
                          {a.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy/60">
                          {a.excerpt || "A new perspective worth discovering."}
                        </p>

                        <span className="mt-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
                          Read story <Arrow />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* THE WORLD, WAITING */}
      <section className="cut-top relative bg-white pb-28 pt-32 lg:pb-40 lg:pt-44">
        <div className="wrap">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label className="text-blue">The world, waiting</Label>
              <h2 className="display mt-4 text-[clamp(3rem,7vw,6.5rem)]">
                Somewhere
                <br />
                <em>out there.</em>
              </h2>
            </div>

            <div className="max-w-xs">
              <p className="text-base leading-relaxed text-navy/65">
                From familiar streets to faraway landscapes, find a place
                that makes you want to pack a bag.
              </p>
              <div className="mt-5">
                <TextLink to="/destinations">All destinations</TextLink>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-12">
            {destinations.slice(0, 4).map((d, i) => (
              <Reveal
                key={d.slug}
                className={`group relative ${
                  i === 0
                    ? "md:col-span-7"
                    : i === 1
                      ? "md:col-span-5 md:mt-20"
                      : i === 2
                        ? "md:col-span-5"
                        : "md:col-span-7 md:-mt-16"
                }`}
              >
                <Link
                  to={`/destinations/${d.slug}`}
                  className="relative block overflow-hidden"
                >
                  <Img
                    kind={d.kind}
                    seed={d.seed}
                    src={d.image}
                    alt={d.name}
                    className={`${
                      i === 0 || i === 3
                        ? "aspect-[5/4]"
                        : "aspect-[4/5]"
                    } transition-transform duration-1000 group-hover:scale-[1.04]`}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/5 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-6 text-ice sm:p-9">
                    <Label className="text-ice/75">
                      {d.region} · {d.country}
                    </Label>

                    <h3 className="display mt-2 text-[clamp(2.5rem,5vw,5rem)] leading-none">
                      {d.name}
                    </h3>

                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-ice/75">
                      {d.tagline || d.blurb}
                    </p>

                    <span className="mt-6 flex items-center justify-between border-t border-ice/30 pt-4 text-sm font-semibold">
                      Discover this place
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATION RAIL */}
      <section className="pb-20 pt-28 lg:pt-36">
        <div className="wrap mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label className="text-blue">Keep wandering</Label>
            <h2 className="display mt-4 text-[clamp(2.8rem,7vw,5.5rem)]">
              More places.
              <br />
              <em>More possibilities.</em>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollRail(-1)}
              aria-label="Previous destinations"
              className="flex h-12 w-12 items-center justify-center border border-navy/30 transition-colors hover:bg-navy hover:text-ice"
            >
              <Arrow className="rotate-180" />
            </button>

            <button
              onClick={() => scrollRail(1)}
              aria-label="Next destinations"
              className="flex h-12 w-12 items-center justify-center border border-navy/30 transition-colors hover:bg-navy hover:text-ice"
            >
              <Arrow />
            </button>
          </div>
        </div>

        <div
          ref={rail}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-16 sm:px-8 lg:px-14"
        >
          {DESTINATIONS.map((d, i) => (
            <Link
              key={d.slug}
              to={`/destinations/${d.slug}`}
              className={`group relative block w-[78vw] max-w-[24rem] shrink-0 snap-start sm:w-[24rem] ${
                i % 2 ? "mt-14" : ""
              }`}
            >
              <Img
                kind={d.kind}
                seed={d.seed}
                src={d.image}
                alt={d.name}
                className="aspect-[3/4]"
              />

              <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-ice">
                <Label className="text-ice/70">
                  {pad(i + 1)} · {d.country}
                </Label>

                <h3 className="display mt-2 text-[3.4rem]">{d.name}</h3>

                <span className="mt-4 block h-px w-10 bg-ice/70 transition-all duration-500 group-hover:w-24" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRAVEL, MADE SMARTER */}
      <section className="relative overflow-hidden bg-navy py-28 text-ice lg:py-40">
        <div className="wrap">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <Reveal className="relative z-10 lg:col-span-7">
              <Label className="text-blue">Travel, made smarter · The Signal</Label>

              <h2 className="display mt-5 text-[clamp(3rem,7vw,6.5rem)] leading-[1.05]">
                A little tech.
                <br />
                <em>A lot more world.</em>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ice/70">
                The apps, tools and clever ideas making modern travel easier.
                From staying connected abroad to finding your way around a
                new city, we've got the useful details covered.
              </p>

              <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-ice/20 pt-8 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.l}>
                    <p className="display text-5xl">
                      <CountUp to={s.n} suffix={s.s} />
                    </p>
                    <Label className="mt-2 block text-ice/55">{s.l}</Label>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <TextLink to="/technology">Explore travel technology</TextLink>
              </div>
            </Reveal>

            <Reveal
              delay={150}
              className="relative lg:col-span-5"
            >
              <Img
                kind="city"
                seed={19}
                src="/images/tech-home.jpg"
                alt="A city skyline at dusk"
                className="aspect-[4/5] border-[10px] border-ice/10"
              />

              <div className="absolute -bottom-8 -left-8 max-w-[17rem] bg-ice p-6 text-navy sm:-left-16">
                <Label className="text-blue">The travel toolkit</Label>
                <p className="display mt-3 text-3xl">
                  Better tools. Better journeys.
                </p>
                <span className="mt-5 block">
                  <Arrow />
                </span>
              </div>
            </Reveal>
          </div>

          {/* TECHNOLOGY STORIES */}
          {tech.length > 0 && (
            <div className="mt-32 border-t border-ice/20 pt-10">
              <div className="mb-8 flex items-center justify-between">
                <Label className="text-blue">The latest signals</Label>
                <TextLink to="/technology">All technology</TextLink>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {tech.slice(0, 3).map((a) => (
                  <Link
                    key={a.slug}
                    to={`/stories/${a.slug}`}
                    className="group border-b border-ice/20 pb-7"
                  >
                    <Label className="text-blue">{a.topic || a.category}</Label>

                    <h3 className="display mt-4 text-3xl leading-tight transition-colors group-hover:text-blue">
                      {a.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-ice/60">
                      {a.excerpt || "Useful ideas for the modern traveller."}
                    </p>

                    <span className="mt-7 flex items-center justify-between text-sm font-semibold">
                      Read more
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* THE TRAVEL GUIDEBOOK */}
      <section className="wrap py-32 lg:py-44">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label className="text-blue">The travel guidebook</Label>

            <h2 className="display mt-4 text-[clamp(2.8rem,7vw,6.5rem)]">
              Know before
              <br />
              <em>you go.</em>
            </h2>
          </div>

          <div className="max-w-xs">
            <p className="text-base leading-relaxed text-navy/65">
              Practical advice for making every trip smoother, from planning
              your budget to finding somewhere worth staying.
            </p>
            <div className="mt-5">
              <TextLink to="/guides">Browse all guides</TextLink>
            </div>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <Ticket g={GUIDES[0]} />
          <Ticket g={GUIDES[1]} offset="md:mt-20" />
          <Ticket g={GUIDES[3]} offset="md:mt-8" />
        </div>
      </section>

      {/* THE TRAVEL JOURNAL */}
      <section className="relative overflow-hidden bg-white py-28 lg:py-40">
        <div className="wrap">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label className="text-blue">The travel journal</Label>

              <h2 className="display mt-4 text-[clamp(3rem,7vw,6.5rem)]">
                Notes from
                <br />
                <em>the road.</em>
              </h2>
            </div>

            <p className="max-w-xs text-base leading-relaxed text-navy/65">
              The little moments, unexpected encounters and personal
              discoveries that make a journey unforgettable.
            </p>
          </div>

          {journal.length > 0 && (
            <div className="grid gap-8 md:grid-cols-12">
              {journal.map((a, i) => (
                <Reveal
                  key={a.slug}
                  className={`group ${
                    i === 0
                      ? "md:col-span-6"
                      : "md:col-span-3 md:mt-20"
                  }`}
                >
                  <Link to={`/stories/${a.slug}`}>
                    <div className="relative overflow-hidden">
                      <Img
                        kind={a.kind}
                        seed={a.seed}
                        src={a.image}
                        alt={a.title}
                        className={`${
                          i === 0 ? "aspect-[4/5]" : "aspect-[3/4]"
                        } transition-transform duration-1000 group-hover:scale-[1.04]`}
                      />

                      <span className="absolute left-4 top-4 bg-ice px-3 py-2">
                        <Label className="text-navy">
                          Field note {pad(i + 1)}
                        </Label>
                      </span>
                    </div>

                    <ArticleMeta article={a} />

                    <h3
                      className={`display mt-4 leading-tight transition-colors group-hover:text-blue ${
                        i === 0 ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
                      }`}
                    >
                      {a.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-navy/60">
                      {a.excerpt || "A personal story from somewhere in the world."}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-3 text-sm font-semibold">
                      Read the journal
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-16 border-t border-navy/15 pt-8 text-center">
            <TextLink to="/stories">More stories from the road</TextLink>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="letter" className="wrap pb-32 pt-32 lg:pb-44 lg:pt-40">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Label className="text-blue">The Roam Edit newsletter</Label>

            <h2 className="display mt-5 text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.98]">
              Mail that
              <br />
              <em>moves</em> you.
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-navy/70">
              A little inspiration for your inbox. Discover new places,
              thoughtful travel stories and useful tools worth knowing about.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-blue" />
              <Label className="text-blue">A thoughtful read, not more noise</Label>
            </div>
          </div>

          <div className="relative lg:col-span-5 lg:col-start-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (form.email.includes("@")) setSent(true);
              }}
              className="relative -rotate-1 bg-white p-8 shadow-[0_40px_70px_-40px_rgba(23,43,58,0.5)] sm:p-10"
            >
              <div className="absolute right-6 top-6 h-24 w-[4.5rem] border border-dashed border-blue p-1.5">
                <Scene kind="coast" seed={8} className="h-full w-full" />
              </div>

              {sent ? (
                <div className="py-10">
                  <p className="display text-5xl italic">Postmarked.</p>
                  <p className="mt-4 text-navy/70">
                    Welcome aboard, {form.name || "traveller"}. Keep an eye
                    on your inbox.
                  </p>
                </div>
              ) : (
                <>
                  <Label className="text-blue">A little something for you</Label>

                  <p className="display mt-3 text-3xl italic">
                    Dear curious traveller,
                  </p>

                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy/60">
                    Leave us your details and we'll send a little inspiration
                    your way.
                  </p>

                  <div className="mt-10 space-y-3 pr-4">
                    <input
                      className="field"
                      placeholder="Your name"
                      aria-label="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />

                    <input
                      className="field"
                      type="email"
                      required
                      placeholder="Your email"
                      aria-label="Your email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>

                  <button className="mt-8 flex w-full items-center justify-between bg-navy px-6 py-4 text-sm font-semibold text-ice transition-colors hover:bg-blue">
                    Count me in
                    <Arrow />
                  </button>

                  <p className="mt-4 text-center text-[11px] text-navy/45">
                    No spam. Just good things to read.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
