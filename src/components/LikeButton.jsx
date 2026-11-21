// src/components/LikeButton.jsx
import { Heart } from './Icons';
import useEngagement from '../hooks/useEngagement';

export default function LikeButton({ story, size = 'md', dark = false, className = '' }) {
  const { liked, likes, toggleLike } = useEngagement(story);
  const sizing = size === 'sm' ? 'gap-1.5 px-2.5 py-1.5 text-xs' : 'gap-2 px-4 py-2.5 text-sm';
  const idle = dark
    ? 'border-paper/30 hover:border-coral hover:text-coral'
    : 'border-navy/20 hover:border-coral hover:text-coral';

  return (
    <button
      type="button"
      onClick={toggleLike}
      aria-pressed={liked}
      aria-label={liked ? 'Unlike this story' : 'Like this story'}
      className={`inline-flex items-center rounded-full border font-semibold transition-all duration-300 active:scale-95 ${sizing} ${
        liked ? 'border-coral bg-coral text-white' : idle
      } ${className}`}
    >
      <span key={String(liked)} className={liked ? 'animate-pop' : ''}>
        <Heart filled={liked} className={size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} />
      </span>
      <span className="tabular-nums">{likes}</span>
      <span className="sr-only">likes</span>
    </button>
  );
}