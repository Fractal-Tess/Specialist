import { TRPCError } from '@trpc/server';
import cookie from 'cookie';

import { prisma } from '../../../prisma.js';
import { DiscordUser } from '@specialist/types';
import { generateToken, getDiscordUser } from './helper.js';

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
  const authToken = generateToken(32);
  await prisma.user.upsert({
    where: {
      discord_id: discordUserId
    },
    create: {
      discord_id: discordUser.id,
      username: discordUser.username,
      auth_token: {
        create: {
          auth_token: authToken
        }
      }
    },
    update: {
      auth_token: {
        upsert: {
          create: {
            auth_token: authToken
          },
          update: {
            auth_token: authToken,
            generated_at: new Date()
          }
        }
      }
    }
  });
  const dm = await discordUser.createDM();
  dm.send(
    `Your new auth token is \`\`\`${authToken}\`\`\`Do not share this token, as having access to it allows anyone to impersonate you.`
  );
};

export const loginUser = async (authToken: string) => {
  const user = await prisma.authToken.findFirst({
    where: {
      auth_token: {
        equals: authToken
      }
    }
  });

  if (!user)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'That token is invalid'
    });

  const authCookie = cookie.serialize('authToken', authToken, {
    httpOnly: true,
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 5)),
    path: '/'
  });

  return authCookie;
};
