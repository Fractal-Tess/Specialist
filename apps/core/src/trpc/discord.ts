import { prisma } from '../prisma.js';
import { client } from '../bot/bot.js';

import type { DiscordUser, DiscordServer, DiscordBot } from '@specialist/types';
export const getUser = (id: string): DiscordUser => {
  const user = client.users.cache.get(id);
  if (!user)
    throw new Error(`Could not find user with discord user id of ${id}`);

  return {
    id,
    avatarUrl: user.avatarURL(),
    username: user.username,
  };
};

export const getServer = (id: string): DiscordServer => {
  const server = client.guilds.cache.get(id);
  if (!server)
    throw new Error(`Could not find discord server with the id of ${id}`);
  return {
    iconUrl: server.iconURL(),
    id: server.id,
    name: server.name,
  };
};

export const getBot = (): DiscordBot => {
  if (!client.user)
    throw new Error("For some reason the bot's own user doesn't exist");
  return {
    id: client.user.id,
    name: client.user.username,
    avatar: client.user.avatarURL(),
  };
};

//   // @ts-ignore
//   const channel = guild?.channels.cache
//     .filter((channel) => {
//       return channel.type === ChannelType.GuildVoice;
//     })!
//     .find((channel) => {
//       return (channel.members as Collection<string, GuildMember>).find(
//         (member) => {
//           return member.id === userId;
//         }
//       );
//     })!;

//   const connection = joinVoiceChannel({
//     channelId: channel.id,
//     guildId: channel.guild.id,
//     adapterCreator: channel.guild.voiceAdapterCreator,
//   });
