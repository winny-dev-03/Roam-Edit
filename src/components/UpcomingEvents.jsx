
import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import SmartImage from './SmartImage';
import { Pin, Clock, Check } from './Icons';
import { upcomingEvents, img } from '../data/site';
import { formatDate } from '../lib/format';

const STORAGE_KEY = 'sammy-iria:saved-events';

function useSaved() {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];

      if (Array.isArray(parsed)) {
        setSaved(parsed);
      }
    } catch (error) {
      console.error('Could not load saved events:', error);
    }
  }, []);

  const toggle = (id) => {
    setSaved((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (error) {
        console.error('Could not save events:', error);
      }

      return next;
    });
  };

  return [saved, toggle];
}

export default function UpcomingEvents({ limit, filterable = false }) {
  const [saved, toggle] = useSaved();
  const [region, setRegion] = useState('All');

  const filteredEvents = upcomingEvents.filter(
    (event) => region === 'All' || event.region === region
  );

  const list = limit
    ? filteredEvents.slice(0, limit)
    : filteredEvents;

  return (
    <div>
      {filterable && (
        <div className="mb-6 flex flex-wrap gap-2">
          {['All', 'Nigeria', 'World'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRegion(item)}
              aria-pressed={region === item}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                region === item
                  ? 'border-navy bg-navy text-paper'
                  : 'border-navy/25 hover:border-navy'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <div
        className={`grid gap-x-8 ${
          limit && limit <= 4 ? 'md:grid-cols-2' : ''
        }`}
      >
        {list.length > 0 ? (
          list.map((event, index) => {
            const isSaved = saved.includes(event.id);

            return (
              <Reveal
                key={event.id}
                as="article"
                delay={index * 60}
                className="grid grid-cols-[4.2rem_1fr] items-center gap-5 border-t border-navy/20 py-6 md:grid-cols-[5.5rem_1fr_7rem] md:gap-6"
              >
                <div className="text-center">
                  <p className="font-display text-5xl font-semibold leading-none">
                    {formatDate(event.date, { day: 'numeric' })}
                  </p>

                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-navy/60">
                    {formatDate(event.date, {
                      month: 'short',
                      year: '2-digit',
                    })}
                  </p>
                </div>

                <div>
                  <p className="mb-1 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-navy/60">
                    <span className="h-3 w-[3px] bg-blue" />
                    {event.tag} · {event.region}
                  </p>

                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">
                    {event.title}
                  </h3>

                  <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-navy/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Pin className="h-4 w-4" />
                      {event.place}
                    </span>

                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </span>
                  </p>

                  <button
                    type="button"
                    onClick={() => toggle(event.id)}
                    aria-pressed={isSaved}
                    className={`mt-3 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      isSaved
                        ? 'border-navy bg-navy text-paper'
                        : 'border-navy/25 hover:border-navy'
                    }`}
                  >
                    {isSaved && <Check className="h-3.5 w-3.5" />}
                    {isSaved ? "I'm going" : 'Save the date'}
                  </button>
                </div>

                <SmartImage
                  src={img(event.image, 500)}
                  alt={event.title}
                  ratio="1/1"
                  className="hidden md:block"
                />
              </Reveal>
            );
          })
        ) : (
          <p className="col-span-full border-t border-navy/20 py-10 text-center text-sm text-navy/60">
            No events found in this category.
          </p>
        )}
      </div>

      <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-navy/45">
        Sample listings. Replace with real events.
      </p>
    </div>
  );
}
