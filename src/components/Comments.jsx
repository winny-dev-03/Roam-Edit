// src/components/Comments.jsx
import { useState } from 'react';
import useEngagement from '../hooks/useEngagement';
import { initials, timeAgo } from '../lib/format';

const tones = ['bg-navy text-paper', 'bg-ice text-navy', 'bg-coral text-white', 'bg-warm text-navy border border-navy/20', 'bg-blue text-white'];
const tone = (name) => tones[[...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % tones.length];

export default function Comments({ story }) {
  const { comments, commentCount, addComment } = useEngagement(story);
  const [name, setName] = useState(() => {
    try { return localStorage.getItem('sammy-iria:name') || ''; } catch { return ''; }
  });
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const n = name.trim();
    const t = text.trim();
    if (n.length < 2) return setError('Tell us your name (at least 2 characters).');
    if (t.length < 3) return setError('Say a little more. Comments need at least 3 characters.');
    setError('');
    setBusy(true);
    try { localStorage.setItem('sammy-iria:name', n); } catch { /* ignore */ }
    await addComment({ name: n, text: t });
    setText('');
    setBusy(false);
  };

  return (
    <section id="comments" className="scroll-mt-24 border-t border-navy/20 bg-paper-2 py-16 md:py-24">
      <div className="mx-auto max-w-[760px] px-4 md:px-0">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/60">The conversation</p>
        <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
          {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </h2>

        <form onSubmit={submit} className="mt-10 space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-navy/60">Your name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} autoComplete="name"
                className="w-full border-b-2 border-navy/30 bg-transparent py-3 text-base outline-none transition focus:border-navy" />
            </label>
            <label className="block">
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-navy/60">Add to the conversation</span>
              <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={800} rows={3}
                className="w-full resize-none border-b-2 border-navy/30 bg-transparent py-3 text-base outline-none transition focus:border-navy" />
            </label>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p role="alert" className="min-h-5 text-sm text-coral">{error}</p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-navy/50">{text.length}/800</span>
              <button type="submit" disabled={busy}
                className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-paper transition hover:bg-blue disabled:opacity-60">
                {busy ? 'Posting…' : 'Post comment'}
              </button>
            </div>
          </div>
        </form>

        <ul className="mt-12 divide-y divide-navy/15">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-4 py-6">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold ${tone(c.name)}`}>
                {initials(c.name)}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">
                  {c.name} <span className="ml-2 font-mono text-[11px] font-normal text-navy/50">{timeAgo(c.date)}</span>
                </p>
                <p className="mt-1 whitespace-pre-line break-words text-base leading-relaxed text-navy/85">{c.text}</p>
              </div>
            </li>
          ))}
          {comments.length === 0 && <li className="py-6 text-navy/60">Be the first to say something.</li>}
        </ul>
      </div>
    </section>
  );
}