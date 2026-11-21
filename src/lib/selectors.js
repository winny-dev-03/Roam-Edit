// src/lib/selectors.js
import { categories } from '../data/site';

const time = (s) => new Date(s.publishedAt).getTime();

export const sortNew = (list) => [...list].sort((a, b) => time(b) - time(a));
export const bySlug = (list, slug) => list.find((s) => s.slug === slug);
export const inSection = (list, section) =>
  sortNew(list.filter((s) => categories[s.category]?.section === section));
export const latest = (list, n = 8) => sortNew(list).slice(0, n);
export const bySammy = (list, n = 6) => sortNew(list.filter((s) => s.origin === 'sammy')).slice(0, n);
export const mostLiked = (list, n = 6) => [...list].sort((a, b) => b.likes - a.likes).slice(0, n);
export const mostDiscussed = (list, n = 3) =>
  [...list.filter((s) => s.comments.length)].sort((a, b) => b.comments.length - a.comments.length).slice(0, n);

export function related(list, story, n = 3) {
  const section = categories[story.category]?.section;
  const others = list.filter((s) => s.slug !== story.slug);
  return [
    ...sortNew(others.filter((s) => categories[s.category]?.section === section)),
    ...sortNew(others.filter((s) => categories[s.category]?.section !== section)),
  ].slice(0, n);
}