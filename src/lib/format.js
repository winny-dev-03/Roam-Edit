// src/lib/format.js
export const formatDate = (iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  new Date(iso).toLocaleDateString('en-GB', { ...opts, timeZone: 'UTC' });

export function readingTime(body) {
  const words = body
    .map((b) => b.text || (b.items || []).join(' ') || '')
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

/**
 * Relative time, computed from the real publication date.
 * precision 'day'    -> only the date is known: "Today", "Yesterday", "3 days ago"
 * precision 'minute' -> full timestamp known:   "18 minutes ago", "5 hours ago"
 */
export function relativeTime(iso, precision = 'minute', now = Date.now()) {
  const nowDate = new Date(now);

  if (precision === 'day') {
    const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
    const days = Math.round((startOfDay(nowDate) - new Date(y, m - 1, d).getTime()) / 86400000);
    if (days <= 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 35) return `${Math.round(days / 7)} week${Math.round(days / 7) > 1 ? 's' : ''} ago`;
    return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  const then = new Date(iso);
  const s = Math.max(0, (now - then.getTime()) / 1000);
  if (s < 60) return 'Just now';
  const mins = Math.floor(s / 60);
  if (mins < 60) return `${mins} minute${mins > 1 ? 's' : ''} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
  const days = Math.round((startOfDay(nowDate) - startOfDay(then)) / 86400000);
  if (days <= 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 35) return `${Math.round(days / 7)} week${Math.round(days / 7) > 1 ? 's' : ''} ago`;
  return then.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const timeAgo = (iso) => relativeTime(iso, 'minute');

export function displayDate(story) {
  if (story.precision === 'day') return formatDate(story.publishedAt);
  return new Date(story.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function exactTime(story) {
  if (story.precision === 'day') return `${formatDate(story.publishedAt)} (time not available)`;
  return new Date(story.publishedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
}

export const initials = (name) =>
  name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();