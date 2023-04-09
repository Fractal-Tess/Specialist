import { TRPCError } from '@trpc/server';
import { DiscordBot } from '@specialist/types';

import { client } from '../../../../bot/bot.js';

export const get = (): DiscordBot => {
  const bot = client.user;
  if (!bot)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        "For some reason the bot's user is undefined... this is prob a bug"
    });

  return {
    avatar: bot.avatarURL(),
    id: bot.id,
    name: bot.username
  };
};
