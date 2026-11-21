// src/components/SmartImage.jsx
import { useState } from 'react';

export default function SmartImage({ src, alt = '', className = '', ratio, priority = false }) {
  const [state, setState] = useState('loading');
  const position = className.includes('absolute') ? '' : 'relative';

  return (
    <div
      className={`img-zoom overflow-hidden bg-paper-2 ${position} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {state !== 'error' && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          style={{ opacity: state === 'ok' ? 1 : 0 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {state === 'error' && (
        <div className="absolute inset-0 grid place-items-center p-3 text-center font-mono text-[10px] uppercase tracking-widest text-navy/45">
          {alt}
        </div>
      )}
    </div>
  );
}