import { writable } from 'svelte/store';
import type { DiscordBot } from '@specialist/types';
import { trpc } from '$lib/trpc';

const createStore = () => {
  const { set, subscribe, update } = writable<DiscordBot | null>(null);

  trpc.getBot
    .query()
    .then(res => {
      set(res);
    })
    .catch(e => {
      console.error(e);
      console.error("Couldn't finish trpc call for bot info");
    });

  return {
    subscribe,
    update,
    set
  };
};

export const bot = createStore();
