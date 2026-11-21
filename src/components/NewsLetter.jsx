// src/components/Newsletter.jsx
import { useState } from 'react';
import Reveal from './Reveal';
import { subscribeToNewsletter } from '../lib/api';
import { Check } from './Icons';

export default function Newsletter({ compact = false }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError('Please enter a valid email address.');
    setError('');
    setState('busy');
    await subscribeToNewsletter(email.trim());
    setState('done');
  };

  return (
    <section id="newsletter" className={`border-t border-navy/20 bg-paper-2 ${compact ? 'py-14' : 'py-20 md:py-32'}`}>
      <div className="mx-auto grid max-w-[1400px] items-end gap-10 px-4 md:px-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/60">Sammy's Sunday Letter</p>
          <h2 className="font-display text-[length:clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[0.93] tracking-[-0.035em]">
            One honest email,<br /><span className="font-light italic">every Sunday.</span>
          </h2>
          {!compact && (
            <p className="mt-6 max-w-lg text-lg text-navy/75">
              The week's stories worth your time, Sammy's latest essays and the one thing he couldn't stop talking about. No noise.
            </p>
          )}
        </Reveal>

        <Reveal delay={150} className="lg:col-span-5">
          {state === 'done' ? (
            <div className="flex items-center gap-3 border-t-[3px] border-navy pt-5 font-display text-2xl">
              <Check className="h-6 w-6" /> You're on the list. See you Sunday.
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com" autoComplete="email"
                  className="min-w-0 flex-1 border-b-2 border-navy/40 bg-transparent py-4 text-lg outline-none transition placeholder:text-navy/40 focus:border-navy" />
                <button type="submit" disabled={state === 'busy'}
                  className="rounded-full bg-navy px-8 py-4 text-sm font-semibold text-paper transition hover:bg-blue disabled:opacity-60">
                  {state === 'busy' ? 'Joining…' : 'Subscribe'}
                </button>
              </div>
              <p role="alert" className="mt-3 min-h-5 text-sm text-coral">{error}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}