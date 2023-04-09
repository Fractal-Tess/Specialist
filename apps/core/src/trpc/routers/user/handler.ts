import { TRPCError } from '@trpc/server';

import { prisma } from '../../../prisma.js';
import { DiscordUser } from '@specialist/types';
import { client } from './../../../bot/bot.js';

// Helpers

const getDiscordUser = (discordUserId: string) => {
  const user = client.users.cache.get(discordUserId);

  if (!user)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `User with the id of '${discordUserId} was not found'`
    });

  return user;
};

export const getUser = (discordUserId: string): DiscordUser => {
  const discordUser = getDiscordUser(discordUserId);
  return {
    avatarUrl: discordUser.avatarURL(),
    id: discordUser.id,
    username: discordUser.username
  };
};

export const createToken = async (discordUserId: string) => {
  const discordUser = getDiscordUser(discordUserId);

  console.log(user);
};
export const loginUser = async (token: string) => {};
