import { writable } from 'svelte/store';
import type { DiscordBot } from '@specialist/types';
import { trpc } from '$lib/trpc';
import { alert } from './alert';

const createStore = () => {
  const { set, subscribe, update } = writable<DiscordBot | null>(null);

  const start = async () => {
    try {
      const bot = await trpc.discord.bot.get.query();
      set(bot);
    } catch (error) {
      alert.handleError(error);
    }
  };

  start();

  return {
    subscribe,
    update,
    set
  };
};

export const bot = createStore();
