import { writable } from 'svelte/store';
import type { User } from '@specialist/types';
import { trpc } from '$lib/trpc';

const createStore = () => {
  const { set, subscribe, update } = writable<User | null>(null);

  const init = async (userId: string) => {
    console.log(`calling init with userid ${userId}`);
    try {
      const user = await trpc.getUser.query(userId);
      localStorage.setItem('discordUserId', user.id);
      set(user);
    } catch (error) {
      console.log('Unable to complete TRPC user fetch');
      console.error(error);
    }
  };

  const userId = localStorage.getItem('discordUserId');
  if (userId) init(userId);

  return {
    subscribe,
    update,
    logout: () => {
      set(null);
      localStorage.removeItem('discordUserId');
    },
    login: async (userId: string) => await init(userId)
  };
};

export const user = createStore();
