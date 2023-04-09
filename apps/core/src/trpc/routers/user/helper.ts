import { TRPCError } from '@trpc/server';
import { client } from '../../../bot/bot.js';

export const getDiscordUser = (discordUserId: string) => {
  const user = client.users.cache.get(discordUserId);

  if (!user)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `User with the id of '${discordUserId} was not found'`
    });

  return user;
};
