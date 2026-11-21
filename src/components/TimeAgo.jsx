// src/components/TimeAgo.jsx
import useNow from '../hooks/useNow';
import { relativeTime, exactTime } from '../lib/format';

export default function TimeAgo({ story, className = '' }) {
  const now = useNow();
  return (
    <time dateTime={story.publishedAt} title={exactTime(story)} className={className}>
      {relativeTime(story.publishedAt, story.precision, now)}
    </time>
  );
}