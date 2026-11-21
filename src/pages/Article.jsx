// src/pages/Article.jsx
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import Reveal from '../components/Reveal';
import SectionHead from '../components/SectionHead';
import EngagementBar from '../components/EngagementBar';
import Comments from '../components/Comments';
import Newsletter from '../components/NewsLetter';
import TimeAgo from '../components/TimeAgo';
import { Label, PhotoArea, SampleTag, StoryCard } from '../components/Stories';
import { ArrowUpRight } from '../components/Icons';
import NotFound from './NotFound';
import { useStories } from '../context/StoriesContext';
import { bySlug, related } from '../lib/selectors';
import { sammy, sections, categories, img } from '../data/site';
import { displayDate, readingTime, initials } from '../lib/format';

function Block({ b, first }) {
  switch (b.type) {
    case 'h2':
      return <h2 className="mb-4 mt-14 font-display text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">{b.text}</h2>;
    case 'quote':
      return (
        <Reveal as="blockquote" className="my-14 border-l-4 border-navy pl-6 md:-mx-16 md:pl-10">
          <p className="font-display text-[length:clamp(1.8rem,3.6vw,3rem)] font-normal italic leading-[1.12] tracking-[-0.02em]">“{b.text}”</p>
        </Reveal>
      );
    case 'image':
      return (
        <Reveal as="figure" className="my-14 md:-mx-24">
          <SmartImage src={b.src} alt={b.caption} ratio="16/9" />
          <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-navy/55">{b.caption}</figcaption>
        </Reveal>
      );
    case 'list':
      return (
        <ul className="my-8 space-y-4">
          {b.items.map((it) => (
            <li key={it} className="flex gap-4">
              <span className="mt-[0.85em] h-1.5 w-1.5 shrink-0 bg-navy" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return <p className={`mb-7 ${first ? 'dropcap' : ''}`}>{b.text}</p>;
  }
}

export default function Article() {
  const { slug } = useParams();
  const { stories } = useStories();
  const story = bySlug(stories, slug);
  const bodyRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const on = () => {
      const el = bodyRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.4;
      setProgress(Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.3) / total)));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [slug]);

  if (!story) return <NotFound />;

  const cat = categories[story.category];
  const section = sections[cat.section];
  const isSammy = story.origin === 'sammy';
  const more = related(stories, story, 3);
  const firstP = story.body.findIndex((b) => b.type === 'p');

  return (
    <article>
      <div className="fixed left-0 top-0 z-[60] h-[3px] bg-navy transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />

      <header className="bg-paper pb-8 pt-10 md:pt-14">
        <div className="mx-auto max-w-[1100px] px-4 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-navy/60">
            <Link to="/" className="link-u">Home</Link> / <Link to={section.path} className="link-u">{section.title}</Link>
          </nav>
          <Label category={story.category} />
          <h1 className="rise mt-4 font-display text-[length:clamp(2.5rem,6.4vw,5.6rem)] font-semibold leading-[0.97] tracking-[-0.035em]">
            {story.title}
          </h1>
          <p className="rise mt-6 max-w-3xl font-display text-xl font-light italic leading-snug text-navy/80 md:text-2xl" style={{ animationDelay: '120ms' }}>
            {story.dek}
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-navy/20 py-4" style={{ animationDelay: '220ms' }}>
            {isSammy ? (
              <SmartImage src={img(sammy.portrait, 200)} alt="Sammy Iria" className="h-12 w-12 shrink-0 rounded-full" />
            ) : (
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-paper">{initials(story.author || 'SI')}</span>
            )}
            <div>
              <p className="text-sm font-semibold">By {story.author}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy/60">
                <TimeAgo story={story} /> · {displayDate(story)} · {readingTime(story.body)} min read
              </p>
            </div>
            {story.sample && <SampleTag />}
          </div>
        </div>
      </header>

      <div className="bg-paper pb-4">
        <div className="mx-auto max-w-[1100px] px-4 md:px-10">
          <PhotoArea images={story.images} ratio="16/9" priority />
        </div>
      </div>

      <div className="bg-warm">
        <div className="mx-auto max-w-[680px] px-4 pt-10 md:px-0">
          {story.source && (
            <div className="mb-8 border-l-4 border-blue bg-ice/40 p-5 text-sm leading-relaxed">
              <p>
                This is a short summary of a report first published by <strong>{story.source.name}</strong> on {displayDate(story)}.
                {story.dateNote ? ` ${story.dateNote}` : ''}
              </p>
              <a href={story.source.url} target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-paper transition hover:bg-blue">
                Read the full report <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
          {story.sample && !isSammy && (
            <div className="mb-8 border-l-4 border-navy/40 bg-paper-2 p-5 text-sm">
              Sample story. This is placeholder content so the layout can be reviewed. Connect your news feed or CMS to replace it.
            </div>
          )}
          <EngagementBar story={story} />
        </div>

        <div ref={bodyRef} className="mx-auto max-w-[680px] px-4 pb-10 pt-12 font-display text-[1.15rem] font-normal leading-[1.8] text-navy/90 md:px-0 md:pt-16 md:text-[1.28rem]">
          {story.body.map((b, i) => <Block key={i} b={b} first={i === firstP} />)}
        </div>

        <div className="mx-auto max-w-[680px] px-4 pb-20 md:px-0">
          {isSammy && (
            <div className="flex items-center gap-5 border-y border-navy/20 py-8">
              <SmartImage src={img(sammy.portrait, 300)} alt="Sammy Iria" className="h-20 w-20 shrink-0 rounded-full" />
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-navy/55">Written by</p>
                <p className="font-display text-2xl font-semibold">Sammy Iria</p>
                <p className="mt-1 text-sm text-navy/70">{sammy.bio[0]}</p>
              </div>
            </div>
          )}
          <div className="mt-8"><EngagementBar story={story} /></div>
        </div>
      </div>

      <Comments story={story} />

      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-10">
          <SectionHead kicker="Related articles" title="Keep reading" />
          <div className="grid gap-10 md:grid-cols-3">
            {more.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100} className={i === 1 ? 'md:mt-10' : ''}>
                <StoryCard story={s} variant="standard" ratio={i === 1 ? '4/5' : '3/2'} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Newsletter compact />

      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <EngagementBar story={story} floating />
      </div>
    </article>
  );
}