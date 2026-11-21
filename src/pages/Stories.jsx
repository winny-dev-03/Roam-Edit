
import { Link } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import { StoryCard, StoryLine, StoryBrief, Label, href } from '../components/Stories';
import { useStories } from '../context/StoriesContext';
import { latest, mostLiked, inSection } from '../lib/selectors';
import { img } from '../data/site';
import { Arrow } from '../components/Icons';

const wrap = 'mx-auto max-w-[1400px] px-4 md:px-10';

const categories = [
  { name: 'Nigerian News', description: 'Stories shaping our home.', to: '/nigerian-news', number: '01' },
  { name: 'World News', description: 'Beyond our borders.', to: '/world-news', number: '02' },
  { name: 'Politics', description: 'Power, people and decisions.', to: '/politics', number: '03' },
  { name: 'Entertainment', description: 'Culture, music and film.', to: '/entertainment', number: '04' },
  { name: 'Technology', description: 'Ideas shaping tomorrow.', to: '/tech', number: '05' },
  { name: 'Lifestyle', description: 'People, living and everything between.', to: '/lifestyle', number: '06' },
  { name: 'Sports', description: 'The moments that move us.', to: '/sports', number: '07' },
  { name: 'Events', description: 'What is happening around us.', to: '/events', number: '08' },
];

function SectionHeading({ kicker, title, description, link }) {
  return (
    <div className="mb-9 flex flex-col gap-5 border-t-[3px] border-navy pt-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-navy/55">
          {kicker}
        </p>
        <h2 className="font-display text-4xl font-semibold leading-none tracking-tight md:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-7 text-navy/65 md:text-base">
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link to={link.to} className="link-u inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
          {link.label} <Arrow className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function StoryRoomCard({ story, number }) {
  return (
    <Link to={href(story)} className="group block">
      <div className="relative overflow-hidden">
        <SmartImage
          src={img(story.images?.[0]?.key || 'news', 900)}
          alt={story.title}
          ratio="4/3"
          className="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {number && (
          <span className="absolute left-3 top-3 bg-paper px-3 py-1 font-mono text-xs text-navy">
            {number}
          </span>
        )}
      </div>
      <div className="mt-4">
        <Label category={story.category} />
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-blue md:text-3xl">
          {story.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-navy/65">
          {story.dek}
        </p>
        <span className="link-u mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]">
          Read story <Arrow className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function Stories() {
  const { stories } = useStories();

  const newest = latest(stories, 30);
  const featured = newest[0];
  const sideStories = newest.slice(1, 4);
  const latestStories = newest.slice(4, 13);
  const popular = mostLiked(stories, 5);
  const editorsPicks = newest.slice(13, 17);

  const categoryStories = categories.map((category) => ({
    ...category,
    stories: inSection(
      stories,
      category.to === '/nigerian-news' ? 'nigeria' :
      category.to === '/world-news' ? 'world' :
      category.to.slice(1)
    ),
  }));

  if (!stories.length) {
    return (
      <section className="min-h-[70vh] bg-paper px-6 py-32 text-center text-navy">
        <p className="font-mono text-xs uppercase tracking-[0.2em]">The Story Room</p>
        <h1 className="mt-5 font-display text-5xl font-semibold">Stories are on their way.</h1>
        <p className="mt-4 text-navy/60">Come back shortly to explore the latest stories.</p>
      </section>
    );
  }

  return (
    <div className="bg-paper text-navy">

      {/* Opening */}
      <section className="overflow-hidden border-b border-navy/15">
        <div className={`${wrap} py-16 md:py-24`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy/55">
              Sammy Iria Blog · The Story Room
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/45">
              News · Culture · Ideas · People
            </p>
          </div>

          <div className="mt-12 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <h1 className="font-display text-[clamp(4rem,11vw,10rem)] font-semibold leading-[0.82] tracking-[-0.07em]">
                Stories
                <br />
                <span className="font-light italic">worth</span> your
                <br />
                time<span className="text-blue">.</span>
              </h1>
            </div>
            <div className="max-w-sm pb-2 lg:col-span-3">
              <div className="mb-5 h-px w-16 bg-navy" />
              <p className="text-lg leading-8 text-navy/75">
                There is always more to the story. Discover the people, moments,
                ideas and conversations shaping the world around us.
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/45">
                Read beyond the headlines
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured story */}
      {featured && (
        <section className="py-14 md:py-20">
          <div className={wrap}>
            <SectionHeading
              kicker="Start here · The latest"
              title="The big story"
              description="A closer look at a story worth your attention."
            />

            <div className="grid gap-9 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Link to={href(featured)} className="group block">
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={img(featured.images?.[0]?.key || 'news', 1600)}
                      alt={featured.title}
                      ratio="16/9"
                      className="transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                    <span className="absolute left-4 top-4 bg-paper px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em]">
                      Featured story
                    </span>
                  </div>
                  <div className="mt-6 max-w-4xl">
                    <Label category={featured.category} />
                    <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] tracking-tight transition-colors group-hover:text-blue md:text-6xl">
                      {featured.title}
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-navy/70 md:text-lg">
                      {featured.dek}
                    </p>
                    <span className="link-u mt-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
                      Enter the story <Arrow className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </div>

              <aside className="lg:col-span-4 lg:border-l lg:border-navy/20 lg:pl-8">
                <p className="mb-5 border-b-[3px] border-navy pb-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                  More to discover
                </p>
                <div>
                  {sideStories.map((story) => (
                    <StoryBrief key={story.slug} story={story} />
                  ))}
                </div>
                <div className="mt-8 bg-warm p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/50">
                    A thought to keep
                  </p>
                  <p className="mt-4 font-display text-2xl italic leading-snug">
                    Every headline has a story. Every story has another side.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* Category directory */}
      <section className="bg-navy py-16 text-paper md:py-24">
        <div className={wrap}>
          <div className="mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ice">
              Find your next read
            </p>
            <h2 className="mt-3 font-display text-5xl font-semibold tracking-tight md:text-7xl">
              Follow your curiosity<span className="text-ice">.</span>
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-paper/65">
              From the conversations happening at home to the ideas changing
              the world, there is a corner here for every curious mind.
            </p>
          </div>

          <div className="grid border-l border-t border-paper/20 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.number}
                to={category.to}
                className="group border-b border-r border-paper/20 p-6 transition-colors hover:bg-paper hover:text-navy md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ice group-hover:text-navy/50">
                    {category.number}
                  </span>
                  <Arrow className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
                <h3 className="mt-10 font-display text-2xl font-semibold md:text-3xl">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-paper/55 transition-colors group-hover:text-navy/65">
                  {category.description}
                </p>
                <span className="mt-6 block font-mono text-[9px] uppercase tracking-[0.2em] text-ice group-hover:text-navy">
                  Explore section ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest stories */}
      <section className="py-16 md:py-24">
        <div className={wrap}>
          <SectionHeading
            kicker="Fresh from the newsroom"
            title="The latest stories"
            description="New perspectives, developing conversations and stories from across the world."
          />

          {latestStories.length > 0 ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {latestStories.map((story, index) => (
                <StoryRoomCard
                  key={story.slug}
                  story={story}
                  number={String(index + 1).padStart(2, '0')}
                />
              ))}
            </div>
          ) : (
            <p className="py-10 text-navy/60">More stories are coming soon.</p>
          )}
        </div>
      </section>

      {/* Editors picks */}
      {editorsPicks.length > 0 && (
        <section className="bg-warm py-16 md:py-24">
          <div className={wrap}>
            <SectionHeading
              kicker="Selected reading"
              title="Worth your attention"
              description="A few more stories to slow down for and spend time with."
            />
            <div className="grid gap-10 lg:grid-cols-2">
              {editorsPicks.map((story) => (
                <StoryCard key={story.slug} story={story} variant="standard" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular */}
      {popular.length > 0 && (
        <section className="py-16 md:py-24">
          <div className={wrap}>
            <SectionHeading
              kicker="Reader favourites"
              title="Stories people are reading"
              description="Join the conversations around stories readers are engaging with."
            />
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                {popular.map((story, index) => (
                  <Link
                    key={story.slug}
                    to={href(story)}
                    className="group flex items-center gap-5 border-t border-navy/20 py-6"
                  >
                    <span className="font-display text-5xl font-light italic text-navy/25 group-hover:text-blue md:text-6xl">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <Label category={story.category} />
                      <span className="mt-2 block font-display text-xl font-semibold leading-snug group-hover:text-blue md:text-2xl">
                        {story.title}
                      </span>
                      <span className="mt-2 block text-sm text-navy/55">
                        {story.likes} likes
                      </span>
                    </span>
                    <Arrow className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-2" />
                  </Link>
                ))}
              </div>
              <div className="flex min-h-[300px] flex-col justify-between bg-navy p-8 text-paper lg:col-span-5 lg:p-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ice">
                  Keep exploring
                </p>
                <div>
                  <h3 className="font-display text-4xl font-semibold leading-tight md:text-5xl">
                    Don't stop at the headline.
                  </h3>
                  <p className="mt-5 leading-7 text-paper/65">
                    Take your time. Follow a conversation. Discover a different
                    perspective. There is always another story to uncover.
                  </p>
                </div>
                <Link
                  to="/"
                  className="mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ice"
                >
                  Back to the front page <Arrow className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final category strip */}
      <section className="border-t border-navy/20 py-14">
        <div className={`${wrap} flex flex-col justify-between gap-6 md:flex-row md:items-center`}>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/50">
              Keep the conversation going
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
              There's always more to discover.
            </h2>
          </div>
          <Link to="/" className="link-u inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
            Explore the homepage <Arrow className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
