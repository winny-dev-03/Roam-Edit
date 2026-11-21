// src/components/Icons.jsx
const I = ({ children, className = 'h-5 w-5', fill = 'none', ...p }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill} stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    {children}
  </svg>
);

export const Heart = ({ filled, ...p }) => (
  <I {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </I>
);
export const Comment = (p) => (
  <I {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></I>
);
export const Share = (p) => (
  <I {...p}>
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
  </I>
);
export const LinkIcon = (p) => (
  <I {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></I>
);
export const Arrow = (p) => (<I {...p}><path d="M5 12h14M13 6l6 6-6 6" /></I>);
export const ArrowUpRight = (p) => (<I {...p}><path d="M7 17L17 7M8 7h9v9" /></I>);
export const Check = (p) => (<I {...p}><path d="M20 6L9 17l-5-5" /></I>);
export const Clock = (p) => (<I {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></I>);
export const Pin = (p) => (<I {...p}><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></I>);
export const Chevron = (p) => (<I {...p}><path d="M6 9l6 6 6-6" /></I>);

// Social icons (simple line glyphs)
export const Facebook = (p) => (
  <I {...p}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></I>
);
export const Instagram = (p) => (
  <I {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </I>
);
export const XIcon = (p) => (<I {...p}><path d="M4 4l16 16M20 4L4 20" /></I>);
export const YouTube = (p) => (
  <I {...p}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <path d="M9.75 15.02l5.75-3.27-5.75-3.27z" />
  </I>
);
export const TikTok = (p) => (
  <I {...p}><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></I>
);

export const socialIcons = { facebook: Facebook, instagram: Instagram, x: XIcon, youtube: YouTube, tiktok: TikTok };