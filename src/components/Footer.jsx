// src/components/Footer.jsx
import { Link } from "react-router";
import { NAV } from "../data/content.js";
import { Label } from "./Ui.jsx";

const SOCIAL = ["Instagram", "X", "YouTube", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-ice">
      <div className="wrap grid gap-14 pb-10 pt-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="display max-w-lg text-[clamp(2.2rem,4.5vw,3.8rem)]">
            Travel writing for people who <em>look twice.</em>
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ice/60">
            An independent magazine about African places, culture and the technology reshaping how we move through them.
          </p>
        </div>
        <nav className="lg:col-span-2 lg:col-start-8" aria-label="Footer">
          <Label className="text-blue">Explore</Label>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((l) => (
              <li key={l.to}><Link to={l.to} className="link-u pb-0.5">{l.label}</Link></li>
            ))}
            <li><Link to="/contact" className="link-u pb-0.5">Contact</Link></li>
          </ul>
        </nav>
        <div className="lg:col-span-2">
          <Label className="text-blue">Follow</Label>
          <ul className="mt-5 space-y-3 text-sm">
            {SOCIAL.map((s) => (
              <li key={s}><a href="#" className="link-u pb-0.5">{s}</a></li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <Label className="text-blue">Write to us</Label>
          <ul className="mt-5 space-y-3 text-sm text-ice/80">
            <li>editor@roamedit.com</li>
            <li>Lagos · Nairobi · Cape Town</li>
          </ul>
        </div>
      </div>

      <div className="wrap flex flex-col justify-between gap-2 border-t border-ice/15 py-6 text-ice/50 sm:flex-row">
        <Label>© {new Date().getFullYear()} Roam Edit</Label>
        <Label>Privacy · Terms · Advertise</Label>
      </div>

      <p aria-hidden="true" className="display pointer-events-none select-none whitespace-nowrap text-center text-[23vw] leading-[0.72] text-blue/20">
        Roam<em>Edit</em>
      </p>
    </footer>
  );
}