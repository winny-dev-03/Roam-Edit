// src/components/Newsletter.jsx
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: connect to the client's email provider.
    setDone(true);
  };

  return (
    <section id="newsletter" className="bg-terracotta text-ivory">
      <div className="container-page grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-label text-ivory/75">The Lodestar Letter</p>
          <h2 className="headline-lg !text-ivory">Africa, delivered to your inbox every week.</h2>
          <p className="mt-4 max-w-md text-ivory/85">
            New destinations, standout stories and the ideas shaping the continent. No noise, just the best of the week.
          </p>
        </div>

        {done ? (
          <p className="font-serif text-2xl">Thank you. Welcome aboard.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full border border-ivory/40 bg-transparent px-5 py-3.5 text-ivory placeholder:text-ivory/60 focus:border-ivory focus:outline-none"
            />
            <button type="submit" className="btn bg-night text-ivory hover:bg-ink">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}