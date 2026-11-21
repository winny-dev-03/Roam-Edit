// src/lib/newsApi.js
// The ONLY place stories are loaded from. To connect a backend or news API:
//   1. set VITE_NEWS_API_URL (e.g. https://api.example.com)
//   2. adapt normalizeStory() so each API item maps to the shape below.
//
// Story shape used across the site:
// {
//   id, slug, category,            // category keys live in data/site.js
//   title, dek,                    // headline + preview
//   images: [{ src | key, alt, caption }],   // 1-4 images (collage)
//   publishedAt,                   // ISO 8601 (real publication time)
//   precision,                     // 'minute' | 'day'  (how exact publishedAt is)
//   origin,                        // 'sammy' | 'wire' | 'desk'
//   author, source: { name, url }, // source only for curated/wire items
//   likes, comments: [], body: [{ type: 'p' | 'h2' | 'quote' | 'image' | 'list', ... }],
//   tags, sample, verified
// }
import { stories as localStories } from '../data/posts';

const API_URL = import.meta.env?.VITE_NEWS_API_URL;

export function normalizeStory(raw) {
  return {
    id: raw.id,
    slug: raw.slug,
    category: raw.category,
    title: raw.title ?? raw.headline,
    dek: raw.dek ?? raw.summary,
    images: (raw.images ?? []).map((i) => ({ src: i.src ?? i.url, alt: i.alt ?? '', caption: i.caption })),
    publishedAt: raw.publishedAt ?? raw.published_at,
    precision: raw.precision ?? 'minute',
    origin: raw.origin ?? 'wire',
    author: raw.author,
    source: raw.source,
    likes: raw.likes ?? 0,
    comments: raw.comments ?? [],
    body: raw.body ?? [{ type: 'p', text: raw.summary ?? '' }],
    tags: raw.tags ?? [],
    sample: false,
    verified: !!raw.verified,
  };
}

export async function fetchStories() {
  if (!API_URL) return localStories;
  const res = await fetch(`${API_URL}/stories`);
  if (!res.ok) throw new Error(`News API responded ${res.status}`);
  const data = await res.json();
  return data.map(normalizeStory);
}