// src/components/ui/SectionHeading.jsx
export default function SectionHeading({ eyebrow, title, action, light = false }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-b border-current/15 pb-6 sm:mb-14">
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className={`headline-lg ${light ? "!text-ivory" : ""}`}>{title}</h2>
      </div>
      {action && (
        <a href={action.href} className={`link-line hidden shrink-0 text-sm font-semibold sm:inline-block ${light ? "text-ivory" : "text-ink"}`}>
          {action.label} →
        </a>
      )}
    </div>
  );
}