// src/pages/Contact.jsx
import { useEffect, useState } from "react";
import { Arrow, Chip, Label } from "../components/Ui.jsx";
import Scene from "../components/Scene.jsx";

const DESKS = [
  { city: "Lagos", tz: "Africa/Lagos", lat: "6.52° N", note: "Editorial & partnerships" },
  { city: "Nairobi", tz: "Africa/Nairobi", lat: "1.29° S", note: "Technology desk" },
  { city: "Cape Town", tz: "Africa/Johannesburg", lat: "33.92° S", note: "Photography & travel" },
];
const TOPICS = ["Pitch a story", "Partnerships", "Press", "Say hello"];

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Contact() {
  const now = useNow();
  const [topic, setTopic] = useState(TOPICS[0]);
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Tell us who you are.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "That email doesn't look right.";
    if (f.message.trim().length < 10) e.message = "A sentence or two, at least.";
    setErr(e);
    return Object.keys(e).length === 0;
  };
  const submit = (e) => {
    e.preventDefault();
    if (validate()) setSent(true); // TODO: connect to your email or form provider.
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const time = (tz) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: tz }).format(now);

  return (
    <section className="wrap pb-28 pt-32 lg:pt-40">
      <div className="grid gap-16 lg:grid-cols-12">
        {/* Left: desks */}
        <div className="lg:col-span-6">
          <Label className="text-blue">Contact</Label>
          <h1 className="display mt-5 text-[clamp(4rem,12vw,11rem)]">Say <em>hello.</em></h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-navy/70">Pitches, partnerships, corrections and compliments all land with a real person on one of our three desks.</p>

          <ul className="mt-14 border-t border-navy">
            {DESKS.map((d) => (
              <li key={d.city} className="grid grid-cols-[1fr_auto] items-end gap-4 border-b border-navy/15 py-6">
                <div>
                  <p className="display text-4xl">{d.city}</p>
                  <Label className="mt-2 block text-navy/55">{d.note} · {d.lat}</Label>
                </div>
                <p className="font-mono text-2xl tabular-nums" aria-label={`Local time in ${d.city}`}>{time(d.tz)}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-navy/60">editor@roamedit.com</p>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative bg-white p-8 shadow-[0_40px_70px_-40px_rgba(23,43,58,0.5)] sm:p-10 lg:mt-24">
            {sent ? (
              <div className="py-10">
                <div className="h-28 w-20 border border-dashed border-blue p-1.5"><Scene kind="coast" seed={12} className="h-full w-full" /></div>
                <p className="display mt-8 text-6xl italic">Sent.</p>
                <p className="mt-4 max-w-xs text-navy/70">Thank you, {f.name.split(" ")[0]}. We reply to every message within three working days.</p>
                <button onClick={() => { setSent(false); setF({ name: "", email: "", message: "" }); }} className="mt-8 text-sm font-semibold underline underline-offset-4">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <Label className="text-blue">I'd like to</Label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {TOPICS.map((t) => <Chip key={t} active={topic === t} onClick={() => setTopic(t)}>{t}</Chip>)}
                </div>
                <div className="mt-8 space-y-2">
                  {[["name", "Your name", "text"], ["email", "Your email", "email"]].map(([k, ph, type]) => (
                    <div key={k}>
                      <input className="field" type={type} placeholder={ph} aria-label={ph} aria-invalid={!!err[k]} value={f[k]} onChange={set(k)} />
                      {err[k] && <p role="alert" className="pt-1 text-sm text-navy/70">↳ {err[k]}</p>}
                    </div>
                  ))}
                  <div>
                    <textarea className="field min-h-36 resize-none" placeholder="Your message" aria-label="Your message" aria-invalid={!!err.message} value={f.message} onChange={set("message")} />
                    {err.message && <p role="alert" className="pt-1 text-sm text-navy/70">↳ {err.message}</p>}
                  </div>
                </div>
                <button className="mt-8 flex w-full items-center justify-between bg-navy px-6 py-4 text-sm font-semibold text-ice transition-colors hover:bg-blue">
                  Send message <Arrow />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}