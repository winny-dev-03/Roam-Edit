// src/pages/Contact.jsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SmartImage from '../components/SmartImage';
import { Check, ArrowUpRight, socialIcons } from '../components/Icons';
import { sendMessage } from '../lib/api';
import { site, socials, sammy, img } from '../data/site';

const topics = ['Say hello', 'Advertising', 'Story tip', 'Collaborate', 'Press'];

export default function Contact() {
  const { state } = useLocation();
  const [form, setForm] = useState({
    name: '', email: '', message: '',
    topic: state?.scrollTo === 'advertise' ? 'Advertising' : topics[0],
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Please tell me your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errs.email = 'That email address looks off.';
    if (form.message.trim().length < 10) errs.message = 'Write a little more (at least 10 characters).';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('busy');
    await sendMessage({ ...form });
    setStatus('done');
  };

  const field = 'w-full border-b-2 border-navy/30 bg-transparent py-3 text-base outline-none transition focus:border-navy';
  const label = 'mb-1 block font-mono text-[11px] uppercase tracking-widest text-navy/60';

  return (
    <div className="grid lg:grid-cols-2">
      <section className="border-b border-navy/20 bg-paper px-4 py-12 md:px-10 lg:border-b-0 lg:border-r lg:py-20">
        <div className="mx-auto max-w-lg">
          <p className="rise mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-navy/65">
            <span className="h-3 w-[3px] bg-blue" /> Contact
          </p>
          <h1 className="rise font-display text-[length:clamp(3.4rem,9vw,7rem)] font-semibold leading-[0.9] tracking-[-0.04em]" style={{ animationDelay: '100ms' }}>
            Say <span className="font-light italic">hello.</span>
          </h1>

          <div className="rise mt-8 flex items-center gap-4" style={{ animationDelay: '200ms' }}>
            <SmartImage src={img(sammy.portrait, 300)} alt="Sammy Iria" className="h-16 w-16 shrink-0 rounded-full" />
            <p className="font-display text-xl italic">Sammy here.</p>
          </div>
          <p className="rise mt-5 text-lg leading-relaxed text-navy/80" style={{ animationDelay: '280ms' }}>
            Got a story tip, an event I should cover, or a strong opinion about something I wrote? I read every message and reply to as many as I can.
          </p>
          <p className="rise mt-5" style={{ animationDelay: '340ms' }}>
            <a href={`mailto:${site.email}`} className="link-u font-display text-2xl">{site.email}</a>
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3">
            {socials.map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <li key={s.key}>
                  <a href={s.href} onClick={s.placeholder ? (e) => e.preventDefault() : undefined}
                    title={s.placeholder ? 'Placeholder: add Sammy\'s real link' : s.label}
                    className="flex items-center justify-between gap-2 border border-navy/25 px-4 py-3 text-sm font-semibold transition hover:bg-navy hover:text-paper">
                    <span className="inline-flex items-center gap-2"><Icon className="h-4 w-4" />{s.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-navy/45">{s.handle}</p>
                </li>
              );
            })}
          </ul>

          <div id="advertise" className="mt-12 scroll-mt-28 border-t-[3px] border-navy pt-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-navy/60">Advertising enquiries</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em]">Advertise with us</h2>
            <p className="mt-3 text-navy/75">
              Reach readers who come for the news and stay for the writing. Choose "Advertising" in the form and tell us about your brand, budget and dates.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-warm px-4 py-12 md:px-10 lg:py-20">
        <div className="mx-auto max-w-lg">
          {status === 'done' ? (
            <div>
              <span className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-navy text-paper"><Check className="h-7 w-7" /></span>
              <h2 className="font-display text-5xl font-semibold tracking-[-0.03em]">Message sent.</h2>
              <p className="mt-4 text-lg text-navy/75">Thanks, {form.name.split(' ')[0]}. I'll get back to you soon.</p>
              <button type="button" onClick={() => { setStatus('idle'); setForm({ name: '', email: '', message: '', topic: topics[0] }); }}
                className="link-u mt-8 text-sm font-semibold">Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-8">
              <div>
                <span className={label}>What's it about?</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <label key={t} className="cursor-pointer">
                      <input type="radio" name="topic" value={t} checked={form.topic === t} onChange={set('topic')} className="peer sr-only" />
                      <span className="inline-block rounded-full border border-navy/25 px-4 py-2 text-sm font-semibold transition peer-checked:border-navy peer-checked:bg-navy peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-blue">
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <label className="block">
                <span className={label}>Your name</span>
                <input value={form.name} onChange={set('name')} autoComplete="name" className={field} />
                {errors.name && <span role="alert" className="mt-1 block text-sm text-coral">{errors.name}</span>}
              </label>
              <label className="block">
                <span className={label}>Email</span>
                <input type="email" value={form.email} onChange={set('email')} autoComplete="email" className={field} />
                {errors.email && <span role="alert" className="mt-1 block text-sm text-coral">{errors.email}</span>}
              </label>
              <label className="block">
                <span className={label}>Message</span>
                <textarea value={form.message} onChange={set('message')} rows={5} className={`${field} resize-none`} />
                {errors.message && <span role="alert" className="mt-1 block text-sm text-coral">{errors.message}</span>}
              </label>
              <button type="submit" disabled={status === 'busy'}
                className="w-full rounded-full bg-navy py-4 text-sm font-semibold text-paper transition hover:bg-blue disabled:opacity-60 sm:w-auto sm:px-10">
                {status === 'busy' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}