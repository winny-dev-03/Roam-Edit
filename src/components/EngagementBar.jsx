// src/components/EngagementBar.jsx
import LikeButton from './LikeButton';
import ShareMenu, { shareUrl, useCopy } from './ShareMenu';
import { Comment, LinkIcon, Check } from './Icons';
import useEngagement from '../hooks/useEngagement';

export default function EngagementBar({ story, floating = false }) {
  const { commentCount } = useEngagement(story);
  const { copied, copy } = useCopy(shareUrl(story));
  const border = floating ? 'border-paper/30' : 'border-navy/20';

  return (
    <div
      className={
        floating
          ? 'flex items-center justify-between gap-2 rounded-full bg-navy p-2 text-paper shadow-2xl'
          : 'flex flex-wrap items-center gap-2.5 text-navy'
      }
    >
      <LikeButton story={story} dark={floating} />
      <button
        type="button"
        onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:border-blue hover:text-blue active:scale-95 ${border}`}
      >
        <Comment />
        <span className="tabular-nums">{commentCount}</span>
        <span className="sr-only">comments</span>
      </button>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:border-blue hover:text-blue active:scale-95 ${border}`}
      >
        {copied ? <Check /> : <LinkIcon />}
        <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy link'}</span>
      </button>
      <ShareMenu story={story} variant="pill" dark={floating} up={floating} align="right" />
    </div>
  );
}