// src/components/Img.jsx
import { useState } from "react";
import Scene from "./Scene.jsx";

// Photo with a built-in art-directed fallback. Put real files in /public/images and they fade in
// over the illustration. Wrap in an element with the `group` class for the hover zoom.
export default function Img({ src, alt = "", kind = "dunes", seed = 1, className = "", eager = false }) {
  const [ok, setOk] = useState(false);
  const pos = /\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative";
  return (
    <div role="img" aria-label={alt} className={`${pos} overflow-hidden bg-navy ${className}`}>
      <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]">
        <Scene kind={kind} seed={seed} className="absolute inset-0 h-full w-full" />
        {src && (
          <img
            src={src}
            alt=""
            loading={eager ? "eager" : "lazy"}
            onLoad={() => setOk(true)}
            onError={() => setOk(false)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ok ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>
    </div>
  );
}