// src/data/site.js
const U = 'https://images.unsplash.com';

// All photography lives here. Swap any ID for a verified or client-supplied image.
// (IDs are unverified suggestions; broken ones fall back to a cream placeholder.)
export const photoIds = {
  crowd: 'photo-1540039155733-5bb30b53aa14',
  concert: 'photo-1501281668745-f7f57925c3b4',
  concert2: 'photo-1514525253161-7a46d19cd819',
  festival: 'photo-1429962714451-bb934ecdc4ec',
  stage: 'photo-1470229722913-7c0e2dbbafd3',
  mic: 'photo-1511671782779-c97d3d27a1d4',
  friends: 'photo-1529156069898-49953e39b3ac',
  party: 'photo-1492684223066-81342ee5ff30',
  celebrate: 'photo-1530103862676-de8c9debad1d',
  cinema: 'photo-1489599849927-2ee91cede3ba',
  city: 'photo-1449824913935-59a10b8d2000',
  cityNight: 'photo-1477959858617-67f85cf4f1df',
  market: 'photo-1488459716781-31db52582fe9',
  laptop: 'photo-1531297484001-80022131f5a1',
  circuit: 'photo-1518770660439-4636190af475',
  team: 'photo-1522202176988-66273c2fd55f',
  workspace: 'photo-1504384308090-c894fdcc538d',
  travel: 'photo-1488646953014-85cb44e25828',
  road: 'photo-1469854523086-cc02fe5d8800',
  plane: 'photo-1436491865332-7a61a109cc05',
  news: 'photo-1504711434969-e33886168f5c',
  globe: 'photo-1451187580459-43490279c0fa',
  gavel: 'photo-1589829545856-d10d557cf95f',
  vote: 'photo-1540910419892-4a36d2c3266c',
  podium: 'photo-1541872703-74c5e44368f9',
  football: 'photo-1431324155629-1a6deb1dec8d',
  stadium: 'photo-1522778119026-d647f0596c20',
  basketball: 'photo-1546519638-68e109498ffc',
  fashion: 'photo-1469334031218-e382a71b716b',
  food: 'photo-1504674900247-0877df9cc836',
  portrait: 'photo-1507003211169-0a1dd7228f2d',
};

export const img = (key, w = 1600) => `${U}/${photoIds[key]}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  name: 'Sammy Iria',
  email: 'hello@example.com', // TODO: replace with Sammy's real address
};

// Main navigation (separate from the social bar)
export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Nigerian News', to: '/nigerian-news' },
  { label: 'World News', to: '/world-news' },
  { label: 'Politics', to: '/politics' },
  { label: 'Entertainment', to: '/entertainment' },
  { label: 'Events', to: '/events' },
  { label: 'Tech', to: '/tech' },
  { label: 'Contact', to: '/contact' },
];

// "More" dropdown
export const moreNav = [
  { label: 'Sports', to: '/sports' },
  { label: 'Lifestyle', to: '/lifestyle' },
];

// Story labels. `section` = the page the story appears on.
export const categories = {
  nigeria: { label: 'Nigerian News', section: 'nigeria' },
  crime: { label: 'Crime', section: 'nigeria' },
  world: { label: 'World News', section: 'world' },
  politics: { label: 'Politics', section: 'politics' },
  opinion: { label: 'Opinion', section: 'politics' },
  entertainment: { label: 'Entertainment', section: 'entertainment' },
  events: { label: 'Events', section: 'events' },
  tech: { label: 'Technology', section: 'tech' },
  lifestyle: { label: 'Lifestyle', section: 'lifestyle' },
  travel: { label: 'Travel', section: 'lifestyle' },
  sports: { label: 'Sports', section: 'sports' },
};

export const sections = {
  nigeria: {
    title: 'Nigerian News', path: '/nigerian-news', kicker: 'Updates from home', photo: 'market',
    photoAlt: 'A busy neighbourhood market',
    intro: 'The stories shaping daily life across Nigeria: the cities, the markets, the commute and the conversations around them.',
  },
  world: {
    title: 'World News', path: '/world-news', kicker: 'Beyond the border', photo: 'globe',
    photoAlt: 'The world seen from space',
    intro: 'International stories, explained plainly, with an eye on what they mean back home.',
  },
  politics: {
    title: 'Politics', path: '/politics', kicker: 'Politics & current affairs', photo: 'vote',
    photoAlt: 'A voting booth',
    intro: 'Elections, courts, budgets and the arguments in between, plus Sammy\'s opinions on all of it.',
  },
  entertainment: {
    title: 'Entertainment', path: '/entertainment', kicker: 'Music · Film · Pop culture', photo: 'concert',
    photoAlt: 'A concert crowd with phone lights',
    intro: 'The songs on repeat, the films worth the ticket and the conversations everyone is having online.',
  },
  events: {
    title: 'Events', path: '/events', kicker: 'Around Nigeria and the world', photo: 'festival',
    photoAlt: 'A festival crowd at golden hour',
    intro: 'What is happening, where to be, and honest coverage from the crowd.',
  },
  tech: {
    title: 'Tech', path: '/tech', kicker: 'Technology & digital culture', photo: 'laptop',
    photoAlt: 'A person working on a laptop',
    intro: 'Innovation, startups, gadgets and digital culture, explained like a person and not a manual.',
  },
  lifestyle: {
    title: 'Lifestyle', path: '/lifestyle', kicker: 'Food · Style · Travel', photo: 'fashion',
    photoAlt: 'Fashion and style',
    intro: 'Food, fashion, family and the small rituals that make a week feel like yours.',
  },
  sports: {
    title: 'Sports', path: '/sports', kicker: 'Sports & trending stories', photo: 'stadium',
    photoAlt: 'A football stadium',
    intro: 'Football first, everything else close behind, and the stories fans are arguing about.',
  },
};

// SOCIAL LINKS — PLACEHOLDERS. Do not publish until Sammy confirms real handles.
export const socials = [
  { key: 'facebook', label: 'Facebook', handle: '@facebook-handle-tbc', href: '#', placeholder: true },
  { key: 'instagram', label: 'Instagram', handle: '@instagram-handle-tbc', href: '#', placeholder: true },
  { key: 'x', label: 'X', handle: '@x-handle-tbc', href: '#', placeholder: true },
  { key: 'youtube', label: 'YouTube', handle: '@youtube-handle-tbc', href: '#', placeholder: true },
  { key: 'tiktok', label: 'TikTok', handle: '@tiktok-handle-tbc', href: '#', placeholder: true },
];

// TODO: placeholder bio — replace with Sammy's own words
export const sammy = {
  name: 'Sammy Iria',
  role: 'Writer · Observer · Opinion-haver',
  portrait: 'portrait',
  bio: [
    "Hi, I'm Sammy. I write because I can't help it. If something makes me laugh, frustrates me or keeps me thinking on the way home, it ends up on this page.",
    "This is my corner of the internet for the news I can't stop talking about, the nights out, the songs on repeat and the opinions I'll defend over dinner. Pull up a chair. Tell me where I'm wrong.",
  ],
  quote: 'I write the things I would say if the conversation never had to end.',
};

export const discoverMore = [
  { key: 'nigeria', title: 'Nigerian News Updates', blurb: 'From Lagos to Abuja to Kano: the stories shaping daily life at home.', to: '/nigerian-news', photo: 'market', ratio: '4/5' },
  { key: 'lifestyle', title: 'Nigerian Lifestyle', blurb: 'Food, fashion, family and the little rituals that make a week.', to: '/lifestyle', photo: 'fashion', ratio: '1/1' },
  { key: 'entertainment', title: 'Entertainment & Pop Culture', blurb: 'Music, film and the conversations everyone is having online.', to: '/entertainment', photo: 'concert', ratio: '4/5' },
  { key: 'politics', title: 'Politics & Current Affairs', blurb: 'Elections, courts, budgets and the arguments in between.', to: '/politics', photo: 'vote', ratio: '1/1' },
  { key: 'events', title: 'Events Around the World', blurb: 'Festivals, gatherings and nights out, near and far.', to: '/events', photo: 'festival', ratio: '4/5' },
  { key: 'sports', title: 'Sports & Trending Stories', blurb: 'Football first, then everything fans are arguing about.', to: '/sports', photo: 'stadium', ratio: '1/1' },
];

// SAMPLE LISTINGS — replace with real events
export const upcomingEvents = [
  { id: 'e1', date: '2026-12-05', region: 'Nigeria', title: 'Harbour Lights Music Night', place: 'Waterfront Arena', time: '7:00 PM', tag: 'Music', image: 'concert2' },
  { id: 'e2', date: '2026-12-12', region: 'Nigeria', title: 'Street Food & Stories Market', place: 'Old Market Square', time: '12:00 PM', tag: 'Food', image: 'friends' },
  { id: 'e3', date: '2026-12-19', region: 'Nigeria', title: 'Words After Dark: Open Mic', place: 'The Lantern Room', time: '8:30 PM', tag: 'Spoken word', image: 'mic' },
  { id: 'e4', date: '2027-01-09', region: 'World', title: 'Future Fest Meetup', place: 'Innovation Hall', time: '10:00 AM', tag: 'Community', image: 'team' },
  { id: 'e5', date: '2027-01-23', region: 'World', title: 'Winter Lights Festival', place: 'City Riverside', time: '6:00 PM', tag: 'Festival', image: 'celebrate' },
];

export const techTopics = ['All', 'Startups', 'Gadgets', 'Innovation', 'Digital culture', 'Opinion'];

export const techWatch = [
  'Phones that quietly do more on-device',
  'Small startups fixing very boring problems',
  'Wearables that know when to stay quiet',
  'Privacy settings that finally make sense',
];