// src/pages/CategoryPage.jsx
import { useState } from 'react';
import Masthead from '../components/MastHead';
import { StoryMosaic, MoreFromSammy } from '../components/Stories';
import { useStories } from '../context/StoriesContext';
import { inSection } from '../lib/selectors';
import { categories } from '../data/site';

export default function CategoryPage({ section }) {
  const { stories } = useStories();
  const list = inSection(stories, section);
  const cats = [...new Set(list.map((s) => s.category))];
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? list : list.filter((s) => s.category === filter);

  return (
    <>
      <Masthead section={section} />
      <section className="bg-warm py-12 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 md:px-10">
          {cats.length > 1 && (
            <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter stories">
              {['all', ...cats].map((c) => (
                <button key={c} type="button" onClick={() => setFilter(c)} aria-pressed={filter === c}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                    filter === c ? 'border-navy bg-navy text-paper' : 'border-navy/25 hover:border-navy'
                  }`}>
                  {c === 'all' ? 'All stories' : categories[c].label}
                </button>
              ))}
            </div>
          )}
          {shown.length ? <StoryMosaic stories={shown} /> : <p className="text-navy/60">No stories here yet.</p>}
        </div>
      </section>
      <MoreFromSammy exclude={shown} />
    </>
  );
}