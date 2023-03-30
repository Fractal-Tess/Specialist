import { TRPCError } from '@trpc/server';
import { writable } from 'svelte/store';
import type { DiscordServer } from '@specialist/types';
import { trpc } from '$lib/trpc';

const createStore = () => {
  const { set, subscribe, update } = writable<DiscordServer[]>([]);

  const servers = localStorage.getItem('servers');

  //   SAVES ONLY THEIR IDS
  const save = (servers: DiscordServer[]) => {
    localStorage.setItem(
      'servers',
      JSON.stringify(servers.map(server => server.id))
    );
  };

  const startup = () => {
    const cached = localStorage.getItem('servers');
    if (!cached) return;
    const serverIds = JSON.parse(cached) as string[];
    serverIds.map(async id => {
      try {
        const server = await trpc.getServer.query(id);
        update(servers => {
          servers.push(server);
          return servers;
        });
      } catch (error) {
        console.error(
          `Server with id of ${id} that was stored in cache was not found`
        );
      }
    });
  };

  startup();
  return {
    subscribe,
    update,
    addServer: async (serverId: string): Promise<void | never> => {
      const server = await trpc.getServer.query(serverId);
      // Try to fetch the server from the bot
      update(servers => {
        // If server is already present in the store
        if (servers.map(server => server.id).includes(server.id))
          throw new Error('Server is already added');

        servers.push(server);
        save(servers);
        return servers;
      });
    },
    removeServer: (serverId: string): void => {
      update(servers => {
        servers = servers.filter(server => server.id !== serverId);
        save(servers);
        return servers;
      });
    }
  };
};

export const servers = createStore();
