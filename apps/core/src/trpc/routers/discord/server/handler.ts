import { TRPCError } from '@trpc/server';

import { DiscordServer } from '@specialist/types';
import { client } from '../../../../bot/bot.js';

export const get = (discordServerId: string): DiscordServer => {
  const server = client.guilds.cache.get(discordServerId);
  if (!server)
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Server with the id of '${discordServerId}' was not found `
    });

  return {
    iconUrl: server.iconURL(),
    id: server.id,
    name: server.name
  };
};
