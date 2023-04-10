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

export const generateToken = (length: number) => {
  let id = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    id += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return id;
};
