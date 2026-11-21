// src/components/ShareMenu.jsx
import { useEffect, useRef, useState } from 'react';
import { Share, Check, LinkIcon } from './Icons';

export const shareUrl = (post) => {
  if (!post?.slug) return window.location.href;

  return `${window.location.origin}/article/${post.slug}`;
};

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

export default function ShareMenu({ post, up = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
if (!post) return null;

const url = shareUrl(post);
  const text = `${post.title} — Sammy Iria`;
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
    { label: 'Email', href: `mailto:?subject=${enc(post.title)}&body=${enc(url)}` },
  ];

  const nativeShare = async () => {
    try { await navigator.share({ title: post.title, text: post.dek, url }); setOpen(false); } catch { /* cancelled */ }
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 rounded-full border border-current/25 px-4 py-2.5 text-sm font-semibold transition hover:border-blue hover:text-blue active:scale-95"
      >
        <Share /> <span className="hidden sm:inline">Share</span>
      </button>
      <div
        role="menu"
        className={`absolute right-0 z-30 w-56 origin-top-right bg-ink p-2 text-ice shadow-2xl transition-all duration-300 ${
          up ? 'bottom-full mb-3' : 'top-full mt-3'
        } ${open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'}`}
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
          {copied ? <Check className="h-4 w-4 text-sky" /> : <LinkIcon className="h-4 w-4" />}
          {copied ? 'Link copied' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}