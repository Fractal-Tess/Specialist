import { Client, GatewayIntentBits } from 'discord.js';

import { config } from '../config.js';
import { messageHandler } from './handler.js';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.on('messageCreate', messageHandler);

client.once('ready', () => {
  console.log('Ready!');
});

client.login(config.TOKEN);
