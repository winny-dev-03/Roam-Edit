// src/components/Ticker.jsx
import { Link } from 'react-router-dom';
import useNow from '../hooks/useNow';
import { relativeTime } from '../lib/format';
import { href } from './Stories';

export default function Ticker({ stories }) {
  const now = useNow();
  if (!stories.length) return null;
  const loop = [...stories, ...stories];

  return (
    <div className="bg-navy text-paper">
      <div className="mx-auto flex max-w-[1400px] items-stretch">
        <span className="z-10 flex shrink-0 items-center bg-coral px-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white md:px-6">
          Latest
        </span>
        <div className="flex-1 overflow-hidden">
          <div className="marquee flex w-max">
            {loop.map((s, i) => (
              <Link key={`${s.slug}-${i}`} to={href(s)} aria-hidden={i >= stories.length}
                tabIndex={i >= stories.length ? -1 : 0}
                className="flex items-center gap-3 whitespace-nowrap py-3 pr-10 text-sm transition-colors hover:text-ice">
                <span className="font-mono text-[11px] text-ice">{relativeTime(s.publishedAt, s.precision, now)}</span>
                <span>{s.title}</span>
                <span className="h-1 w-1 rounded-full bg-paper/50" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}