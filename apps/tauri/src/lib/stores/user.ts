import { TRPCError } from '@trpc/server';
import { writable } from 'svelte/store';
import type { DiscordUser } from '@specialist/types';
import { alert } from './alert';
import { trpc } from '$lib/trpc';

const createStore = () => {
  const { set, subscribe, update } = writable<DiscordUser | null>(null);

  const start = async () => {
    const discordUserId = localStorage.getItem('discordUserId');
    if (!discordUserId) return;
    try {
      const user = await trpc.user.get.query({ discordUserId: discordUserId });
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
        const user = await trpc.user.login.mutate({ token });
        console.log(user);
        // set(user);
        // localStorage.setItem('token', token);
        // localStorage.setItem('userId', user.id);
      } catch (error) {
        alert.handleError(error);
      }
    },
    createToken: async (discordUserId: string) => {
      try {
        await trpc.user.createToken.mutate({ discordUserId });
      } catch (error) {
        alert.handleError(error);
      }
    }
  };
};

export const user = createStore();
