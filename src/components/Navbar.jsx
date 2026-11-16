// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { NAV, pad } from "../data/content.js";
import { Arrow, Label } from "./Ui.jsx";

export function Wordmark({ className = "" }) {
  return (
    <span className={`display inline-flex items-baseline gap-[0.18em] text-[1.9rem] leading-none ${className}`}>
      Roam<em className="italic">Edit</em>
      <span className="mb-[0.1em] inline-block h-1.5 w-1.5 rounded-full bg-blue" />
    </span>
  );
}

const POPULAR = ["Lagos", "Safari", "Fintech", "Packing", "Dunes"];

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");

  const heroPage = pathname === "/" || pathname.startsWith("/destinations/");
  const light = heroPage && !scrolled && !menu && !search;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu || search ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && (setMenu(false), setSearch(false));
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menu, search]);

  const go = (term) => {
    const t = term.trim();
    if (!t) return;
    navigate(`/search?q=${encodeURIComponent(t)}`);
    setQ("");
  };
  const submit = (e) => {
    e.preventDefault();
    go(q);
  };

  const ink = light || menu ? "text-ice" : "text-navy";
  const solid = scrolled && !menu && !search;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Bar */}
      <div className={`relative z-10 transition-colors duration-500 ${solid ? "border-b border-navy/10 bg-ice/95" : "border-b border-transparent"} ${ink}`}>
        <div className="wrap flex h-16 items-center justify-between lg:h-20">
          <Link to="/" aria-label="Roam Edit home"><Wordmark /></Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {NAV.map((l) => (
              <NavLink key={l.to} to={l.to} className="link-u pb-1 text-[0.92rem] font-medium">
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <button onClick={() => { setSearch(!search); setMenu(false); }} aria-label="Search" className="p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
            <Link
              to="/#letter"
              className={`hidden border px-5 py-2.5 text-sm font-semibold transition-colors duration-300 sm:block ${
                light || menu ? "border-ice/60 hover:bg-ice hover:text-navy" : "border-navy hover:bg-navy hover:text-ice"
              }`}
            >
              Subscribe
            </Link>
            <button
              onClick={() => { setMenu(!menu); setSearch(false); }}
              aria-expanded={menu}
              aria-label="Menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <span className={`h-px w-6 bg-current transition-transform duration-500 ${menu ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`h-px w-6 bg-current transition-transform duration-500 ${menu ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Search sheet */}
      <div
        onClick={() => setSearch(false)}
        className={`fixed inset-0 bg-navy/50 transition-opacity duration-500 ${search ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <div
        className={`fixed inset-x-0 top-0 bg-white pb-12 pt-28 text-navy transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${search ? "translate-y-0" : "-translate-y-full"}`}
      >
        <form onSubmit={submit} className="wrap">
          <Label className="text-blue">Search Roam Edit</Label>
          <div className="mt-4 flex items-end gap-4 border-b border-navy">
            <input
              autoFocus={search}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="A place, a story, a guide…"
              aria-label="Search"
              className="display w-full bg-transparent py-3 text-[clamp(2rem,6vw,4.5rem)] placeholder:text-navy/25 focus:outline-none"
            />
            <button className="mb-4 hidden items-center gap-2 text-sm font-semibold sm:flex">Search <Arrow /></button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Label className="mr-2 text-navy/50">Popular</Label>
            {POPULAR.map((p) => (
              <button type="button" key={p} onClick={() => go(p)} className="border border-navy/20 px-3 py-1.5 text-sm transition-colors hover:border-navy hover:bg-navy hover:text-ice">
                {p}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Mobile menu */}
      <div
        aria-hidden={!menu}
        className="fixed inset-0 bg-navy text-ice transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.7,0,0.2,1)] lg:hidden"
        style={{ clipPath: menu ? "circle(150% at calc(100% - 2.5rem) 2rem)" : "circle(0% at calc(100% - 2.5rem) 2rem)" }}
      >
        <div className="wrap flex h-full flex-col justify-between pb-8 pt-28">
          <nav className="flex flex-col" aria-label="Mobile">
            {[...NAV, { to: "/contact", label: "Contact" }].map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                tabIndex={menu ? 0 : -1}
                style={{ transitionDelay: menu ? `${350 + i * 70}ms` : "0ms" }}
                className={`group flex items-baseline gap-4 border-b border-ice/15 py-3 transition-all duration-700 ${menu ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <Label className="text-blue">{pad(i + 1)}</Label>
                <span className="display text-[2.8rem] transition-transform duration-500 group-hover:translate-x-2">{l.label}</span>
              </Link>
            ))}
          </nav>
          <div className={`transition-opacity delay-700 duration-700 ${menu ? "opacity-100" : "opacity-0"}`}>
            <Link to="/#letter" tabIndex={menu ? 0 : -1} className="mb-6 flex items-center justify-between border border-ice/40 px-5 py-4 text-sm font-semibold">
              Subscribe to the Thursday Dispatch <Arrow />
            </Link>
            <div className="flex items-center justify-between text-ice/60">
              <Label>6.52° N · 3.38° E</Label>
              <Label>Issue 07</Label>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}