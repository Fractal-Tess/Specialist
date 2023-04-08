import { TRPCError } from '@trpc/server';

import { prisma } from '../prisma.js';
import { getUser } from './utils.js';
import { createID } from '../utils.js';
import { DiscordUser } from '@specialist/types';
import { handleGetUser } from '../trpc/handlers.js';

export const createToken = async (
  discordUserId: string
): Promise<void | never> => {
  const user = await getUser(discordUserId);
  if (!user)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `User with the discord id of ${discordUserId} was not found`
    });
  const token = createID(24);

  const dm = await user.createDM();

  dm.send(
    `Your new auth token is \`\`\`${token}\`\`\`Do not share this with anybody`
  );

  await prisma.user.upsert({
    where: {
      discord_id: discordUserId
    },
    create: {
      discord_id: user.id,
      username: user.username,
      auth_token: {
        create: {
          auth_token: token
        }
      }
    },
    update: {
      auth_token: {
        // Check if entry is deleted when a new token is create
        create: {
          auth_token: token
        }
      }
    }
  });
};

export const loginUser = async (
  token: string
): Promise<DiscordUser | never> => {
  const user = await prisma.user.findFirst({
    where: {
      auth_token: {
        auth_token: {
          equals: token
        }
      }
    }
  });
  if (!user)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Token was not found'
    });

  return handleGetUser(user.discord_id.toString());
};
