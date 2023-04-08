import { TRPCError } from '@trpc/server';
import {
  getBot,
  getServer,
  getUser,
  playAudioWithUser
} from '../discord/utils.js';
import { DiscordBot, DiscordServer, DiscordUser } from '@specialist/types';

import { prisma } from '../prisma.js';

export const handleGetUser = (discordUserId: string): DiscordUser | never => {
  const user = getUser(discordUserId);
  if (!user)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `User with id of ${discordUserId} was not found`
    });
  return {
    avatarUrl: user.avatarURL(),
    id: user.id,
    username: user.username
  };
};

export const handleGetServer = (
  discordServerId: string
): DiscordServer | never => {
  const server = getServer(discordServerId);
  if (!server)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `Discord server with the id of ${discordServerId} was not found`
    });

  return {
    iconUrl: server.icon,
    id: server.id,
    name: server.name
  };
};

export const handleGetBot = (): DiscordBot => {
  const bot = getBot();
  if (!bot)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'This should not happen. For some reason the bot cannot find itself... just @Haquinn'
    });
  return {
    avatar: bot.avatar,
    id: bot.id,
    name: bot.username
  };
};

export const handleGetImages = async () =>
  await prisma.image.findMany({
    include: {
      User: {
        select: { username: true, discord_id: true }
      }
    }
  });

export const handleGetAudios = async () =>
  await prisma.audio.findMany({
    include: {
      User: {
        select: {
          username: true,
          discord_id: true
        }
      }
    }
  });

export const handleCreateImage = async () => {
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Not implemented yet'
  });
};

export const handleCreateAudio = async () => {
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Not implemented yet'
  });
};

export const handlePlayAudio = async (
  resourceUrl: string,
  discordUserId: string
) => {
  playAudioWithUser(resourceUrl, discordUserId);
};
