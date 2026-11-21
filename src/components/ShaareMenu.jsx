// src/components/ShareMenu.jsx
import { useEffect, useRef, useState } from 'react';
import { Share, Check, LinkIcon } from './Icons';

export const shareUrl = (story) => `${window.location.origin}/article/${story.slug}`;

export function useCopy(url) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const t = document.createElement('textarea');
      t.value = url;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return { copied, copy };
}

/**
 * variant "text" = underlined mono link (used under READ MORE on story cards)
 * variant "pill" = bordered button (used in the article engagement bar)
 */
export default function ShareMenu({ story, variant = 'text', dark = false, up = false, align = 'left' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const url = shareUrl(story);
  const text = `${story.title} — Sammy Iria`;
  const { copied, copy } = useCopy(url);
  const enc = encodeURIComponent;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const targets = [
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${enc(`${text} ${url}`)}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: 'Email', href: `mailto:?subject=${enc(story.title)}&body=${enc(url)}` },
  ];

  const nativeShare = async () => {
    try { await navigator.share({ title: story.title, text: story.dek, url }); setOpen(false); } catch { /* cancelled */ }
  };

  const trigger =
    variant === 'pill'
      ? `inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:border-blue hover:text-blue active:scale-95 ${dark ? 'border-paper/30' : 'border-navy/20'}`
      : 'link-u inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em]';

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu" className={trigger}>
        <Share className="h-4 w-4" />
        <span className={variant === 'pill' ? 'hidden sm:inline' : ''}>Share</span>
      </button>
      <div
        role="menu"
        className={`absolute z-30 w-56 bg-navy p-2 text-paper shadow-2xl transition-all duration-300 ${
          up ? 'bottom-full mb-3' : 'top-full mt-3'
        } ${align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'} ${
          open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'
        }`}
      >
        {typeof navigator !== 'undefined' && navigator.share && (
          <button type="button" onClick={nativeShare} className="block w-full px-4 py-2.5 text-left text-sm hover:bg-navy-2">
            Share via device…
          </button>
        )}
        {targets.map((t) => (
          <a key={t.label} href={t.href} target="_blank" rel="noopener noreferrer"
            className="block px-4 py-2.5 text-sm hover:bg-navy-2" onClick={() => setOpen(false)}>
            {t.label}
          </a>
        ))}
        <button type="button" onClick={copy} className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-navy-2">
          {copied ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
          {copied ? 'Link copied' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}