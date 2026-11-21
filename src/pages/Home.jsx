// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Reveal from '../components/Reveal';
import SmartImage from '../components/SmartImage';
import SectionHead from '../components/SectionHead';
import Ticker from '../components/Ticker';
import Newsletter from '../components/NewsLetter';
import UpcomingEvents from '../components/UpcomingEvents';
import ShareMenu from '../components/ShareMenu';
import { PhotoArea, StoryCard, StoryLine, StoryBrief, StoryMosaic, StoryFooter, Label, href } from '../components/Stories';
import TimeAgo from '../components/TimeAgo';
import { Arrow } from '../components/Icons';
import { useStories } from '../context/StoriesContext';
import { bySlug, inSection, latest, bySammy, mostLiked, mostDiscussed } from '../lib/selectors';
import { sammy, discoverMore, socials, img } from '../data/site';
import { socialIcons } from '../components/Icons';

const wrap = 'mx-auto max-w-[1400px] px-4 md:px-10';
const TONES = {
  paper: 'bg-paper text-navy',
  warm: 'bg-warm text-navy',
  paper2: 'bg-paper-2 text-navy',
  navy: 'bg-navy text-paper',
};
const Band = ({ tone = 'paper', children, id }) => (
  <section id={id} className={`${TONES[tone]} py-16 md:py-24`}>
    <div className={wrap}>{children}</div>
  </section>
);

/* 3. Main editorial hero */
function EditorialHero({ hero, top }) {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return (
  <section id="stories" className="scroll-mt-4 bg-paper pb-14 pt-6 md:pb-20 md:pt-10">
      <div className={wrap}>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2 border-y border-navy py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span>Today's front page</span>
          <span className="hidden sm:inline">Sammy Iria · writer &amp; editor</span>
          <span>{today}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <article className="story lg:col-span-8">
            <div className="mb-4 flex items-center gap-4">
              <Label category={hero.category} />
              {hero.verified && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-navy/55">Source: {hero.source?.name}</span>
              )}
            </div>
            <h1 className="rise font-display text-[length:clamp(2.5rem,6vw,5.4rem)] font-semibold leading-[0.97] tracking-[-0.035em]">
              <Link to={href(hero)} className="transition-colors hover:text-blue">{hero.title}</Link>
            </h1>
            <p className="rise mt-5 max-w-3xl text-lg text-navy/75 md:text-xl" style={{ animationDelay: '120ms' }}>{hero.dek}</p>
            <Link to={href(hero)} className="rise mt-7 block" style={{ animationDelay: '220ms' }} aria-label={`Open: ${hero.title}`}>
              <PhotoArea images={hero.images} ratio="16/10" priority />
            </Link>
            <div className="mt-6 flex flex-col items-start gap-2.5">
              <Link to={href(hero)} className="link-u inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em]">
                Read more <Arrow className="h-3.5 w-3.5" />
              </Link>
          <ShareMenu post={hero} up={false} />
            </div>
            <StoryFooter story={hero} />
          </article>

          <aside className="lg:col-span-4 lg:border-l lg:border-navy/20 lg:pl-8">
            <p className="mb-2 border-b-[3px] border-navy pb-2 font-mono text-[11px] uppercase tracking-[0.2em]">Top stories</p>
            {top.map((s) => <StoryBrief key={s.slug} story={s} />)}

            <div className="mt-8 border border-navy/20 bg-warm p-5">
              <div className="flex items-center gap-4">
                <SmartImage src={img(sammy.portrait, 300)} alt="Sammy Iria" className="h-16 w-16 shrink-0 rounded-full" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/55">Your host</p>
                  <p className="font-display text-xl font-semibold">Sammy Iria</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-navy/75">{sammy.bio[0]}</p>
              <a href="#sammy" className="link-u mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
                Latest thoughts <Arrow className="h-3.5 w-3.5" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* Lifestyle & Sports duo */
function Duo({ lifestyle, sports }) {
  const col = (title, to, list) => (
    <div>
      <div className="mb-6 flex items-end justify-between border-t-[3px] border-navy pt-3">
        <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] md:text-4xl">{title}</h3>
        <Link to={to} className="link-u inline-flex items-center gap-2 text-sm font-semibold">See all <Arrow className="h-4 w-4" /></Link>
      </div>
      {list[0] && <Reveal><StoryCard story={list[0]} variant="standard" /></Reveal>}
      <div className="mt-8">
        {list.slice(1, 3).map((s) => (<Reveal key={s.slug}><StoryLine story={s} /></Reveal>))}
      </div>
    </div>
  );
  return (
    <div className="grid gap-14 lg:grid-cols-2 lg:gap-0">
      <div className="lg:border-r lg:border-navy/20 lg:pr-10">{col('Lifestyle', '/lifestyle', lifestyle)}</div>
      <div className="lg:pl-10">{col('Sports', '/sports', sports)}</div>
    </div>
  );
}

/* 10. Discover More */
function DiscoverMore() {
  return (
   <Band tone="paper2" id="destinations">
      <Reveal className="mb-12 grid items-end gap-6 border-t-[3px] border-navy pt-4 md:mb-16 lg:grid-cols-12">
        <h2 className="font-display text-[length:clamp(3rem,9vw,8rem)] font-semibold uppercase leading-[0.88] tracking-[-0.04em] lg:col-span-8">
          Discover<br /><span className="font-light italic normal-case">more.</span>
        </h2>
        <p className="max-w-sm text-lg text-navy/75 lg:col-span-4">
          Wander off the front page. Every corner of the blog has its own stories, photographs and opinions.
        </p>
      </Reveal>

      <div className="grid gap-x-6 gap-y-14 md:grid-cols-3">
        {discoverMore.map((d, i) => (
          <Reveal key={d.key} delay={(i % 3) * 100} className={i % 3 === 1 ? 'md:mt-16' : ''}>
            <Link to={d.to} className="story group block">
              <div className="relative">
                <SmartImage src={img(d.photo, 1000)} alt={d.title} ratio={d.ratio} />
                <span className="absolute left-3 top-3 bg-paper px-2 py-1 font-mono text-[11px] text-navy">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.025em] transition-colors group-hover:text-blue">{d.title}</h3>
              <p className="mt-2 max-w-sm text-navy/70">{d.blurb}</p>
              <span className="link-u mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
                Explore <Arrow className="h-3.5 w-3.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* 11. Sammy's latest thoughts */
function SammySection({ posts }) {
  const [lead, ...rest] = posts;
  return (
    <section id="sammy" className="scroll-mt-16 bg-navy py-16 text-paper md:py-24">
      <div className={wrap}>
        <SectionHead dark kicker="Opinions · essays · personal posts" title="Sammy's latest thoughts" />
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SmartImage src={img(sammy.portrait, 1000)} alt="Portrait of Sammy Iria" ratio="4/5" />
            <p className="mt-5 font-display text-2xl italic leading-snug">"{sammy.quote}"</p>
            <p className="mt-3 text-sm leading-relaxed text-paper/75">{sammy.bio[1]}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Sammy on social media (placeholders)">
              {socials.map((s) => {
                const Icon = socialIcons[s.key];
                return (
                  <li key={s.key}>
                    <a href={s.href} onClick={s.placeholder ? (e) => e.preventDefault() : undefined}
                      title={s.placeholder ? `${s.label}: placeholder handle` : s.label}
                      className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-3.5 py-2 text-xs font-semibold transition hover:bg-paper hover:text-navy">
                      <Icon className="h-4 w-4" /> {s.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <div className="lg:col-span-4">{lead && <Reveal><StoryCard story={lead} variant="standard" dark ratio="4/5" /></Reveal>}</div>

          <div className="lg:col-span-4">
            <p className="mb-1 border-b border-paper/25 pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ice">Recent posts</p>
            {rest.map((s) => (
              <Reveal key={s.slug}>
                <article className="border-b border-paper/20 py-5">
                  <Label category={s.category} />
                  <h3 className="mt-1.5">
                    <Link to={href(s)} className="font-display text-xl font-semibold leading-snug transition-colors hover:text-ice">{s.title}</Link>
                  </h3>
                  <p className="mt-1.5 text-xs text-paper/65"><TimeAgo story={s} className="font-semibold" /> · {s.likes} likes · {s.comments.length} comments</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 12. Popular stories */
function Popular({ liked, talked }) {
  return (
    <Band tone="warm">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHead kicker="Most read" title="Popular stories" />
          <ol>
            {liked.map((s, i) => (
              <Reveal key={s.slug} as="li" delay={i * 60}>
                <Link to={href(s)} className="group flex items-center gap-4 border-t border-navy/20 py-5 md:gap-6">
                  <span className="w-12 shrink-0 font-display text-5xl font-light italic text-navy/25 transition-colors group-hover:text-blue md:w-16 md:text-6xl">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <Label category={s.category} />
                    <span className="mt-1 block font-display text-xl font-semibold leading-snug md:text-2xl">{s.title}</span>
                    <span className="mt-1 block text-xs text-navy/55"><TimeAgo story={s} className="font-semibold" /> · {s.likes} likes</span>
                  </span>
                  <SmartImage src={img(s.images[0].key || 'news', 400)} alt="" ratio="1/1" className="hidden h-20 w-20 shrink-0 sm:block" />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5">
          <SectionHead kicker="Popular discussions" title="People are talking" />
          <div className="space-y-8">
            {talked.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <Link to={`${href(s)}#comments`} className="group block border-l-[3px] border-navy pl-5">
                  <p className="font-display text-xl italic leading-snug md:text-2xl">"{s.comments[0].text}"</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-navy/60">{s.comments[0].name} · on {s.title}</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:text-blue">
                    Join {s.comments.length} comments <Arrow className="h-4 w-4" />
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}

export default function Home() {
  const { stories } = useStories();
  const hero = bySlug(stories, 'atikus-court-setback-and-apcs-divided-loyalty') || latest(stories, 1)[0];
  if (!hero) return null;

  const top = latest(stories, 7).filter((s) => s.slug !== hero.slug).slice(0, 5);
  const nigeria = inSection(stories, 'nigeria');
  const world = inSection(stories, 'world');
  const politics = inSection(stories, 'politics').filter((s) => s.slug !== hero.slug);
  const entertainment = inSection(stories, 'entertainment');
  const events = inSection(stories, 'events');
  const lifestyle = inSection(stories, 'lifestyle');
  const sports = inSection(stories, 'sports');

  const [ng1, ng2, ng3, ...ngRest] = nigeria;
  const [w1, w2, ...wRest] = world;
  const [e1, e2, e3, ...eRest] = entertainment;

return (
  <>
    <Hero />
    <EditorialHero hero={hero} top={top} />
    <Ticker stories={latest(stories, 8)} />
      {/* 5. Top Nigerian stories */}
      <Band tone="warm">
        <SectionHead kicker="Top Nigerian stories" title="At home" action={{ to: '/nigerian-news', label: 'All Nigerian news' }} />
        <div className="grid gap-10 lg:grid-cols-12">
          {ng1 && <Reveal className="lg:col-span-7"><StoryCard story={ng1} variant="feature" /></Reveal>}
          <div className="space-y-10 lg:col-span-5 lg:border-l lg:border-navy/15 lg:pl-8">
            {[ng2, ng3].filter(Boolean).map((s, i) => (<Reveal key={s.slug} delay={i * 100}><StoryCard story={s} variant="compact" /></Reveal>))}
          </div>
        </div>
        {ngRest.length > 0 && (
          <div className="mt-14 grid gap-10 border-t border-navy/20 pt-10 md:grid-cols-3">
            {ngRest.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 100} className={i === 1 ? 'md:mt-10' : ''}>
                <StoryCard story={s} variant="standard" ratio={i === 1 ? '4/5' : '3/2'} />
              </Reveal>
            ))}
          </div>
        )}
      </Band>

      {/* 6. International */}
      <Band tone="paper">
        <SectionHead kicker="International" title="Around the world" action={{ to: '/world-news', label: 'All world news' }} />
        <div className="grid gap-10 lg:grid-cols-12">
          {w1 && <Reveal className="lg:col-span-7"><StoryCard story={w1} variant="feature" /></Reveal>}
          {w2 && <Reveal delay={120} className="lg:col-span-5"><StoryCard story={w2} variant="standard" ratio="4/5" /></Reveal>}
        </div>
        {wRest.length > 0 && (
          <div className="mt-14 grid gap-10 border-t border-navy/20 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {wRest.slice(0, 3).map((s, i) => (<Reveal key={s.slug} delay={i * 80}><StoryCard story={s} variant="compact" /></Reveal>))}
          </div>
        )}
      </Band>

      {/* 7. Politics (selected dark section) */}
      <Band tone="navy">
        <SectionHead dark kicker="Politics & current affairs" title="The political desk" action={{ to: '/politics', label: 'All politics' }} />
        <div className="grid gap-12 lg:grid-cols-12">
          {politics[0] && <Reveal className="lg:col-span-7"><StoryCard story={politics[0]} variant="feature" dark /></Reveal>}
          <div className="lg:col-span-5 lg:border-l lg:border-paper/20 lg:pl-8">
            {politics.slice(1, 5).map((s, i) => (<Reveal key={s.slug}><StoryLine story={s} index={i} dark /></Reveal>))}
          </div>
        </div>
      </Band>

      {/* 8. Entertainment */}
      <Band tone="paper2">
        <SectionHead kicker="Music · film · pop culture" title="Entertainment" action={{ to: '/entertainment', label: 'All entertainment' }} />
        <div className="grid gap-10 lg:grid-cols-12">
          {e1 && <Reveal className="lg:col-span-6"><StoryCard story={e1} variant="feature" ratio="1/1" /></Reveal>}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6">
            {[e2, e3].filter(Boolean).map((s, i) => (
              <Reveal key={s.slug} delay={i * 100} className={i === 1 ? 'sm:mt-12' : ''}>
                <StoryCard story={s} variant="compact" ratio={i === 1 ? '4/5' : '4/3'} />
              </Reveal>
            ))}
          </div>
        </div>
        {eRest.length > 0 && (
          <div className="mt-12 grid gap-x-10 md:grid-cols-3">
            {eRest.slice(0, 3).map((s) => (<Reveal key={s.slug}><StoryLine story={s} /></Reveal>))}
          </div>
        )}
      </Band>

      {/* 9. Events around Nigeria and the world */}
      <Band tone="warm">
        <SectionHead kicker="Around Nigeria and the world" title="Events" action={{ to: '/events', label: 'All events' }} />
        <UpcomingEvents limit={4} />
        <div className="mt-14 border-t border-navy/20 pt-12">
          <StoryMosaic stories={events} short />
        </div>
      </Band>

      {/* Lifestyle & Sports */}
      <Band tone="paper">
        <Duo lifestyle={lifestyle} sports={sports} />
      </Band>

      <DiscoverMore />
      <SammySection posts={bySammy(stories, 4)} />
      <Popular liked={mostLiked(stories, 6)} talked={mostDiscussed(stories, 3)} />
      <Newsletter />
    </>
  );
}