// src/hooks/useNow.js
import { useSyncExternalStore } from 'react';

let now = Date.now();
const subs = new Set();
let timer = null;

const subscribe = (cb) => {
  subs.add(cb);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => { now = Date.now(); subs.forEach((s) => s()); }, 30000);
  }
  return () => {
    subs.delete(cb);
    if (!subs.size) { clearInterval(timer); timer = null; }
  };
};

/** Shared 30-second clock so "5 minutes ago" keeps itself up to date. */
export default function useNow() {
  return useSyncExternalStore(subscribe, () => now);
}