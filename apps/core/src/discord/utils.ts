import type { DiscordUser, DiscordServer, DiscordBot } from '@specialist/types';
import { ChannelType, Collection, GuildMember, User } from 'discord.js';
import { Readable } from 'node:stream';

import { client } from '../bot/bot.js';
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel
} from '@discordjs/voice';

export const getUser = (id: string) => client.users.cache.get(id);

export const getServer = (id: string) => client.guilds.cache.get(id);

export const getBot = () => client.user;

export const requestToken = (discordUserId: string): void => {
  if (!client.user)
    throw new Error("For some reason the bot's own user doesn't exist");
};

export const playAudioWithUser = (audioUrl: string, discordUserId: string) => {
  client.guilds.cache.find(async guild => {
    const channel = guild.channels.cache
      .filter(channel => {
        return channel.type === ChannelType.GuildVoice;
      })!
      .find(channel => {
        return (channel.members as Collection<string, GuildMember>).find(
          member => {
            return member.id === discordUserId;
          }
        );
      })!;

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });
    const res = await fetch(audioUrl);

    const buffer = new Uint8Array(await res.arrayBuffer());
    const readable = new Readable();

    readable._read = () => {}; // _read is required but we can noop it
    readable.push(buffer);
    readable.push(null);
    const player = createAudioPlayer();
    connection.subscribe(player);
    const audioResource = createAudioResource(readable);

    player.play(audioResource);
    await new Promise(resolve => player.on(AudioPlayerStatus.Idle, resolve));
  });
};
