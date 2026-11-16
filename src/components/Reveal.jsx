// src/components/Reveal.jsx
import { useEffect, useRef, useState } from "react";

// Fades and lifts its children into view the first time they scroll on screen.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${seen ? "is-in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}