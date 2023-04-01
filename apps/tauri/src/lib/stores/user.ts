import { TRPCError } from '@trpc/server';
import { writable } from 'svelte/store';
import type { DiscordUser } from '@specialist/types';
import { alert } from './alert';
import { trpc } from '$lib/trpc';

const createStore = () => {
  const { set, subscribe, update } = writable<DiscordUser | null>(null);

  const start = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    try {
      const user = await trpc.getUser.query(userId);
      set(user);
    } catch (error) {
      alert.handleError(error);
    }
  };

  start();

  return {
    subscribe,
    update,
    logout: () => {
      set(null);
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
    },
    login: async (token: string) => {
      try {
        const user = await trpc.loginUser.mutate(token);
        set(user);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id);
      } catch (error) {
        alert.handleError(error);
      }
    },
    createToken: async (userId: string) => {
      try {
        await trpc.createUserToken.mutate(userId);
      } catch (error) {
        alert.handleError(error);
      }
    }
  };
};

export const user = createStore();
