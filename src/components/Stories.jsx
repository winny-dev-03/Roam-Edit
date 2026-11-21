// src/components/Stories.jsx
import { Link } from 'react-router-dom';
import SmartImage from './SmartImage';
import Reveal from './Reveal';
import SectionHead from './SectionHead';
import ShareMenu from './ShareMenu';
import LikeButton from './LikeButton';
import TimeAgo from './TimeAgo';
import { Comment, Arrow } from './Icons';
import useEngagement from '../hooks/useEngagement';
import { useStories } from '../context/StoriesContext';
import { bySammy } from '../lib/selectors';
import { categories, img } from '../data/site';
import { readingTime } from '../lib/format';

export const href = (s) => `/article/${s.slug}`;
const srcOf = (im, w) => im.src || img(im.key, w);

/* ───────── small pieces ───────── */

export function Label({ category, className = '' }) {
  const c = categories[category];
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] ${className}`}>
      <span className="h-3 w-[3px] bg-blue" />
      {c ? c.label : category}
    </span>
  );
}

export function SampleTag({ dark = false }) {
  return (
    <span
      title="Sample content. Replace with real reporting."
      className={`rounded-sm border px-1.5 py-px font-mono text-[9px] uppercase tracking-widest ${dark ? 'border-paper/40 text-paper/70' : 'border-navy/30 text-navy/55'}`}
    >
      Sample
    </span>
  );
}

/** Photo area: one large image, or a small editorial gallery of 2–4 photos. */
export function PhotoArea({ images, ratio = '3/2', priority = false, caption, className = '' }) {
  const list = (images || []).slice(0, 4);
  const n = list.length;
  if (!n) return null;

  const layouts = {
    1: { grid: 'grid-cols-1 grid-rows-1', cells: [''] },
    2: { grid: 'grid-cols-2 grid-rows-1', cells: ['', ''] },
    3: { grid: 'grid-cols-3 grid-rows-2', cells: ['col-span-2 row-span-2', '', ''] },
    4: { grid: 'grid-cols-4 grid-rows-2', cells: ['col-span-2 row-span-2', 'col-span-2', '', ''] },
  };
  const L = layouts[n];
  const cap = caption ?? list[0]?.caption;

  return (
    <figure className={className}>
      <div className={`grid gap-1 ${L.grid}`} style={{ aspectRatio: ratio }}>
        {list.map((im, i) => (
          <div key={i} className={`relative min-h-0 overflow-hidden ${L.cells[i]}`}>
            <SmartImage src={srcOf(im, i ? 900 : 1400)} alt={im.alt || ''} priority={priority && i === 0}
              className="absolute inset-0 h-full w-full" />
          </div>
        ))}
      </div>
      {cap && <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] opacity-60">{cap}</figcaption>}
    </figure>
  );
}

/** Bottom row: publish time · likes · like button · comments link */
export function StoryFooter({ story, dark = false }) {
  const { commentCount } = useEngagement(story);
  return (
    <footer className={`mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-3 ${dark ? 'border-paper/20' : 'border-navy/15'}`}>
      <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${dark ? 'text-paper/70' : 'text-navy/60'}`}>
        <TimeAgo story={story} className="font-semibold" />
        {story.author && <span>· {story.author}</span>}
        {story.sample && <SampleTag dark={dark} />}
      </p>
      <div className="flex items-center gap-2">
        <LikeButton story={story} size="sm" dark={dark} />
        <Link
          to={`${href(story)}#comments`}
          aria-label={`${commentCount} comments. Open comments`}
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition hover:border-blue hover:text-blue ${dark ? 'border-paper/30' : 'border-navy/20'}`}
        >
          <Comment className="h-4 w-4" />
          <span className="tabular-nums">{commentCount}</span>
        </Link>
      </div>
    </footer>
  );
}

/* ───────── story card ─────────
   Order inside every card: label + headline → photo area → preview
   → READ MORE → SHARE → time / likes / comments / like button.          */

const SIZES = {
  lead: { h: 'text-[length:clamp(2.2rem,4.4vw,4rem)]', r: '16/10' },
  feature: { h: 'text-[length:clamp(1.8rem,3.2vw,2.9rem)]', r: '4/3' },
  standard: { h: 'text-2xl md:text-[1.7rem]', r: '3/2' },
  compact: { h: 'text-xl md:text-2xl', r: '4/3' },
};

export function StoryCard({ story, variant = 'standard', dark = false, ratio, className = '' }) {
  const s = SIZES[variant];
  return (
    <article className={`story flex flex-col ${dark ? 'text-paper' : 'text-navy'} ${className}`}>
      <header>
        <div className="mb-3 flex items-center justify-between gap-3">
          <Label category={story.category} />
          {variant !== 'compact' && (
            <span className={`font-mono text-[10px] uppercase tracking-widest ${dark ? 'text-paper/60' : 'text-navy/50'}`}>
              {readingTime(story.body)} min read
            </span>
          )}
        </div>
        <h3>
          <Link to={href(story)}
            className={`font-display font-semibold leading-[1.04] tracking-[-0.025em] transition-colors ${dark ? 'hover:text-ice' : 'hover:text-blue'} ${s.h}`}>
            {story.title}
          </Link>
        </h3>
      </header>

      <Link to={href(story)} aria-label={`Open: ${story.title}`} className="mt-4 block">
        <PhotoArea images={story.images} ratio={ratio || s.r} />
      </Link>

      <div className="mt-4">
        <p className={`line-clamp-3 text-[0.95rem] leading-relaxed ${dark ? 'text-paper/80' : 'text-navy/75'}`}>{story.dek}</p>
        <div className="mt-4 flex flex-col items-start gap-2.5">
          <Link to={href(story)} className="link-u inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em]">
            Read more <Arrow className="h-3.5 w-3.5" />
          </Link>
          <ShareMenu story={story} variant="text" dark={dark} />
        </div>
      </div>

      <StoryFooter story={story} dark={dark} />
    </article>
  );
}

/** Text-led story (no photo) for dense lists */
export function StoryLine({ story, index, dark = false, className = '' }) {
  return (
    <article className={`border-t py-6 ${dark ? 'border-paper/20 text-paper' : 'border-navy/20 text-navy'} ${className}`}>
      <div className="flex items-start gap-5">
        {index != null && (
          <span className={`font-display text-4xl font-light italic leading-none md:text-5xl ${dark ? 'text-ice' : 'text-blue'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <Label category={story.category} />
          <h3 className="mt-2">
            <Link to={href(story)}
              className={`font-display text-2xl font-semibold leading-[1.1] tracking-[-0.02em] transition-colors md:text-[1.7rem] ${dark ? 'hover:text-ice' : 'hover:text-blue'}`}>
              {story.title}
            </Link>
          </h3>
          <p className={`mt-2 line-clamp-2 text-sm ${dark ? 'text-paper/75' : 'text-navy/70'}`}>{story.dek}</p>
          <StoryFooter story={story} dark={dark} />
        </div>
      </div>
    </article>
  );
}

/** Label + headline + time only (sidebars) */
export function StoryBrief({ story, dark = false }) {
  return (
    <article className={`border-t py-4 first:border-t-0 ${dark ? 'border-paper/20' : 'border-navy/15'}`}>
      <Label category={story.category} />
      <h3 className="mt-1.5">
        <Link to={href(story)} className={`font-display text-lg font-semibold leading-snug transition-colors ${dark ? 'hover:text-ice' : 'hover:text-blue'}`}>
          {story.title}
        </Link>
      </h3>
      <p className={`mt-1.5 flex items-center gap-2 text-xs ${dark ? 'text-paper/65' : 'text-navy/55'}`}>
        <TimeAgo story={story} className="font-semibold" />
        {story.sample && <SampleTag dark={dark} />}
      </p>
    </article>
  );
}

/** Varied arrangement used on section pages and the homepage */
export function StoryMosaic({ stories, short = false, dark = false }) {
  const [f, s1, s2, ...more] = stories;
  const row = more.slice(0, 3);
  const rest = more.slice(3);
  const rule = dark ? 'border-paper/20' : 'border-navy/20';
  if (!f) return null;

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7"><StoryCard story={f} variant="feature" dark={dark} /></Reveal>
        {(s1 || s2) && (
          <div className={`space-y-10 lg:col-span-5 lg:border-l lg:pl-8 ${dark ? 'lg:border-paper/20' : 'lg:border-navy/15'}`}>
            {[s1, s2].filter(Boolean).map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}><StoryCard story={s} variant="compact" dark={dark} /></Reveal>
            ))}
          </div>
        )}
      </div>

      {!short && row.length > 0 && (
        <div className={`mt-14 grid gap-10 border-t pt-10 md:grid-cols-3 ${rule}`}>
          {row.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100} className={i === 1 ? 'md:mt-10' : ''}>
              <StoryCard story={s} variant="standard" dark={dark} ratio={i === 1 ? '4/5' : '3/2'} />
            </Reveal>
          ))}
        </div>
      )}

      {!short && rest.length > 0 && (
        <div className="mt-14 grid gap-x-12 md:grid-cols-2">
          {rest.map((s, i) => (<Reveal key={s.slug}><StoryLine story={s} index={i} dark={dark} /></Reveal>))}
        </div>
      )}
    </div>
  );
}

/** "From Sammy's desk" strip at the bottom of section pages */
export function MoreFromSammy({ exclude = [] }) {
  const { stories } = useStories();
  const skip = new Set(exclude.map((s) => s.slug));
  const items = bySammy(stories, 12).filter((s) => !skip.has(s.slug)).slice(0, 3);
  if (!items.length) return null;
  return (
    <section className="border-t border-navy/20 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <SectionHead kicker="Keep reading" title="From Sammy's desk" />
        <div className="grid gap-10 md:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100} className={i === 1 ? 'md:mt-10' : ''}>
              <StoryCard story={s} variant="standard" ratio={i === 1 ? '4/5' : '3/2'} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}