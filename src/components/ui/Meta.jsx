// src/components/ui/Meta.jsx
export default function Meta({ author, date, readTime, light = false }) {
  const tone = light ? "text-ivory/70" : "text-ink-mute";
  const items = [author && `By ${author}`, date, readTime].filter(Boolean);
  return (
    <p className={`text-xs ${tone}`}>
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 opacity-50">·</span>}
          {item}
        </span>
      ))}
    </p>
  );
}