// src/pages/Tech.jsx
import { useState } from 'react';
import Masthead from '../components/MastHead';
import SectionHead from '../components/SectionHead';
import Reveal from '../components/Reveal';
import { StoryMosaic, MoreFromSammy } from '../components/Stories';
import { useStories } from '../context/StoriesContext';
import { inSection } from '../lib/selectors';
import { techTopics, techWatch } from '../data/site';

export default function Tech() {
  const { stories } = useStories();
  const list = inSection(stories, 'tech');
  const [topic, setTopic] = useState('All');
  const shown = topic === 'All' ? list : list.filter((s) => s.tags?.includes(topic));

  return (
    <>
      <Masthead section="tech" />

      <section className="bg-warm py-12 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 md:px-10">
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Tech topics">
            {techTopics.map((t) => (
              <button key={t} type="button" onClick={() => setTopic(t)} aria-pressed={topic === t}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                  topic === t ? 'border-navy bg-navy text-paper' : 'border-navy/25 hover:border-navy'
                }`}>
                {t}
              </button>
            ))}
          </div>
          {shown.length ? <StoryMosaic stories={shown} /> : <p className="text-navy/60">Nothing under this topic yet.</p>}
        </div>
      </section>

      <section className="bg-navy py-16 text-paper md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-4 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead dark kicker="Innovation · startups · gadgets" title="What I'm watching" className="!mb-0" />
          </div>
          <Reveal className="lg:col-span-7">
            <ul className="font-display text-2xl leading-snug md:text-3xl">
              {techWatch.map((t) => (<li key={t} className="border-t border-paper/20 py-5">{t}</li>))}
            </ul>
          </Reveal>
        </div>
      </section>

      <MoreFromSammy exclude={shown} />
    </>
  );
}