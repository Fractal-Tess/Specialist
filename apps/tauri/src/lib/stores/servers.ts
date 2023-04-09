import { writable } from 'svelte/store';
import type { DiscordServer } from '@specialist/types';
import { trpc } from '$lib/trpc';

const createStore = () => {
  const { subscribe, update } = writable<DiscordServer[]>([]);

  const startup = () => {
    const cached = localStorage.getItem('servers');
    if (!cached) return;
    const serverIds = JSON.parse(cached) as string[];
    serverIds.map(async id => {
      try {
        const server = await trpc.discord.server.get.query({
          discordServerId: id
        });
        update(servers => [...servers, server]);
      } catch (error) {
        console.error(
          `Server with id of ${id} that was stored in cache was not found`
        );
      }
    });
  };

  startup();

  const save = (servers: DiscordServer[]) => {
    localStorage.setItem(
      'servers',
      JSON.stringify(servers.map(server => server.id))
    );
  };

  return {
    subscribe,
    update,
    addServer: async (discordServerId: string): Promise<void | never> => {
      const server = await trpc.discord.server.get.query({ discordServerId });
      update(servers => {
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
