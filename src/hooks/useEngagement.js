
import { useSyncExternalStore } from 'react';
import { subscribe, getState, toggleLike, addComment } from '../lib/api';

export default function useEngagement(post) {
  const state = useSyncExternalStore(subscribe, getState);
  const liked = !!state.likes[post.slug];
  const local = state.comments[post.slug] || [];
  const comments = [...local, ...post.comments];
  return {
    liked,
    likes: post.likes + (liked ? 1 : 0),
    comments,
    commentCount: comments.length,
    toggleLike: () => toggleLike(post.slug),
    addComment: (payload) => addComment(post.slug, payload),
  };
}