// src/pages/Entertainment.jsx
import { Link } from 'react-router-dom';
import CategoryHero from '../components/CategoryHero';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import { StoryFeature, StoryTile, StoryText, MoreFromSammy, href } from '../components/Stories';
import { byCategory } from '../data/posts';

export default function Entertainment() {
  const [lead, second, third] = byCategory('entertainment');
  const words = ['Music', 'Movies', 'Pop culture', 'Hot takes', 'Celebrity', 'Live shows'];
  const talk = byCategory('entertainment').flatMap((p) => p.comments.slice(0, 2).map((c) => ({ ...c, post: p }))).slice(0, 4);

  return (
    <>
      <CategoryHero
        category="entertainment" eyebrow="Music · Movies · Pop culture"
        title={<>Turn it <span className="font-light italic text-coral">up.</span></>}
        intro="The songs on repeat, the films worth the ticket and the conversations everyone is having in the group chat."
        image="stage"
      />

      <section className="bg-ice py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead kicker="Cover story" title="The big one." />
          <Reveal><StoryFeature post={lead} className="min-h-[560px] md:min-h-[720px]" /></Reveal>
        </div>
      </section>

      <div className="overflow-hidden bg-coral py-4 text-white" aria-hidden="true">
        <div className="marquee flex w-max font-display text-3xl font-semibold italic md:text-5xl">
          {[...words, ...words].map((w, i) => <span key={i} className="pr-12">{w} ✦</span>)}
        </div>
      </div>

      <section className="bg-gradient-to-br from-navy via-navy-2 to-blue py-20 text-ice md:py-28">
        <div className="mx-auto grid max-w-[1400px] items-start gap-12 px-5 md:px-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5"><StoryTile post={second} dark ratio="4/5" /></Reveal>
          <div className="lg:col-span-7 lg:pt-24">
            <SectionHead dark kicker="Hot take" title="Fame, fast." />
            <Reveal><StoryText post={third} index={0} dark /></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ice-2 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <SectionHead kicker="What you're saying" title="The group chat, on the page." />
          <div className="grid gap-6 md:grid-cols-2">
            {talk.map((c, i) => (
              <Reveal key={c.id + i} delay={i * 80}>
                <Link to={`${href(c.post)}#comments`} className="group block border-l-4 border-coral bg-ice p-7 transition-colors hover:bg-white">
                  <p className="font-display text-xl italic leading-snug md:text-2xl">"{c.text}"</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-navy/60">{c.name} · on {c.post.title}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <MoreFromSammy exclude="entertainment" />
    </>
  );
}