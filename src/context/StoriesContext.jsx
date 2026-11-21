// src/context/StoriesContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchStories } from '../lib/newsApi';
import { stories as seed } from '../data/posts';

const Ctx = createContext({ stories: seed, loading: false, error: null });

export function StoriesProvider({ children }) {
  const [state, setState] = useState({ stories: seed, loading: true, error: null });

  useEffect(() => {
    let live = true;
    fetchStories()
      .then((stories) => live && setState({ stories, loading: false, error: null }))
      .catch((error) => live && setState((p) => ({ ...p, loading: false, error })));
    return () => { live = false; };
  }, []);

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export const useStories = () => useContext(Ctx);