
const KEY = 'sammy-iria:engagement:v1';
const empty = { likes: {}, comments: {} };

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || empty; } catch { return empty; }
};

let state = load();
const listeners = new Set();

const commit = (next) => {
  state = next;
  try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
  listeners.forEach((l) => l());
};

export const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };
export const getState = () => state;
const wait = (ms = 350) => new Promise((r) => setTimeout(r, ms));

const pushLocal = (key, item) => {
  try {
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push(item);
    localStorage.setItem(key, JSON.stringify(list));
  } catch { /* ignore */ }
};

export async function toggleLike(slug) {
  const liked = !state.likes[slug];
  commit({ ...state, likes: { ...state.likes, [slug]: liked } }); // optimistic
  return liked;
}

export async function addComment(slug, { name, text }) {
  await wait();
  const comment = {
    id: `local-${Date.now()}`,
    name,
    text,
    date: new Date().toISOString(),
    local: true,
  };
  commit({ ...state, comments: { ...state.comments, [slug]: [comment, ...(state.comments[slug] || [])] } });
  return comment;
}

export async function subscribeToNewsletter(email) {
  await wait(600);
  pushLocal('sammy-iria:subscribers', { email, date: new Date().toISOString() });
  return { ok: true };
}

export async function sendMessage(payload) {
  await wait(700);
  pushLocal('sammy-iria:messages', { ...payload, date: new Date().toISOString() });
  return { ok: true };
}