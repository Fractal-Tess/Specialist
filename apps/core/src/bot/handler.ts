import type { Resource } from '@specialist/prisma';
import { ChannelType, EmbedBuilder, Message, TextChannel } from 'discord.js';
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from '@discordjs/voice';
import { Readable } from 'node:stream';
import { prisma } from '../prisma.js';

export const messageHandler = async (msg: Message) => {
  // Check if message is intended for the bot
  if (!msg.content.startsWith('!special') || msg.author.bot) return;
  if (msg.channel.type !== ChannelType.GuildText) {
    msg.reply('Cannot use this here.');
    return;
  }

  // Help
  if (msg.content === '!special -help') {
    sendHelpEmbed(msg.channel);
    return;
  }

  // Parse input
  const input = parseInput(msg);
  if (!input.args.length) {
    if (input.mentions.length) {
      msg.channel.send(
        `${input.mentions.toString()} You Can Cope Harder Nigger${
          input.mentions.length - 1 ? 's' : ''
        }`
      );
    } else {
      msg.channel.send('Cope Harder Nigger');
    }
    return;
  }

  const audios: Resource[] = [];
  const images: Resource[] = [];

  const parsedMap = new Map<string, Resource>();
  const notFound = new Set<string>();

  for (const arg of input.args) {
    if (notFound.has(arg)) continue; // If we know this arg wasn't previously found
    let resource = parsedMap.get(arg); // Try to get it from memory

    if (!resource) {
      // If not found in memory
      resource =
        (await prisma.resource.findFirst({
          //Try finding it in the database
          where: {
            tag: {
              equals: arg,
            },
          },
        })) || undefined;
      if (!resource) {
        // If not found in the database
        notFound.add(arg); // Add to not found
        continue;
      }
      parsedMap.set(arg, resource); // if found add it to the memory map
    }
    let res = resource!;

    if (res.is_audio) audios.push(res);
    else images.push(res);
  }

  if (audios.length) {
    if (!msg.member) {
      msg.reply('Sadly you are not a member - this code should be unreachable');
      return;
    }
    if (!msg.member.voice) {
      msg.reply('You need to be in voice, You fucking Nigger');
      return;
    }
    if (!msg.member.voice.channel) {
      msg.reply('For some reason channel === null');
      return;
    }
    const connection = joinVoiceChannel({
      channelId: msg.member.voice.channel.id,
      guildId: msg.member.voice.channel.guild.id,
      adapterCreator: msg.guild!.voiceAdapterCreator,
    });
    const player = createAudioPlayer();
    connection.subscribe(player);

    const buffers = new Map<string, Uint8Array>();
    for (const audio of audios) {
      let buffer = buffers.get(audio.resource_url);
      if (!buffer) {
        const res = await fetch(audio.resource_url);

        buffer = new Uint8Array(await res.arrayBuffer());
        buffers.set(audio.resource_url, buffer);
      }

      const readable = new Readable();

      readable._read = () => {}; // _read is required but we can noop it
      readable.push(buffer);
      readable.push(null);

      const audioResource = createAudioResource(readable);

      player.play(audioResource);
      await new Promise((resolve) =>
        player.on(AudioPlayerStatus.Idle, resolve)
      );
    }
  }

  if (images.length) {
    for (const image of images) {
      msg.channel.send(image.resource_url);
    }
  }

  if (notFound.size)
    msg.reply(
      `No tags were found for [${[...notFound].toString()}] you fucking nigger`
    );
};

const parseInput = (msg: Message) => {
  const content = msg.content
    .replace('!special', '')
    .split(/\s+/)
    .filter(Boolean);
  const mentions = msg.mentions.users.map((user) => `<@${user.id}>`);
  const args = content
    .filter((arg) => !mentions.includes(arg))
    .filter((arg) => !mentions.includes(arg));

  return {
    args,
    content,
    mentions,
  };
};

const sendHelpEmbed = (channel: TextChannel) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Specialist')
    .setURL('https://github.com/Fractal-Tess/Specialist')
    .setAuthor({
      name: 'Fractal-Tess',
      iconURL:
        'https://avatars.githubusercontent.com/u/75957529?s=400&u=30fd73a52f90841a24066972211b84aee9a51527&v=4',
      url: 'https://specialist.app.jet-black.xyz/',
    })
    .setDescription('The _non-racist_ specialist')
    .setThumbnail('https://i.imgur.com/8BbEJf9.png')
    .addFields(
      {
        name: 'Available commands for the cotton farmers',
        value: '\u200B',
      },
      {
        name: 'Classic - (works with replies and mentions)',
        value: '!special',
      },
      {
        name: 'Play audio',
        value: '!special <audio_tag>',
      },
      {
        name: 'Show image',
        value: '!special <image_tag>',
      }
    )
    .setFooter({
      text: 'Consult your nigger before use',
      iconURL: 'https://i.imgur.com/8BbEJf9.png',
    });

  channel.send({ embeds: [exampleEmbed] });
};
