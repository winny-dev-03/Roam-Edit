// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, state, hash } = useLocation();

  useEffect(() => {
    const target = state?.scrollTo || (hash ? hash.slice(1) : null);
    if (target) {
      const t = setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' }), 500);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, state, hash]);

  return null;
}