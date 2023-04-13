import { TRPCError } from '@trpc/server';
import cookie from 'cookie';

import { trpc } from '../trpc.js';
import { config } from '../../config.js';
import { prisma } from '../../prisma.js';

export const authProcedure = trpc.procedure.use(async ({ next, ctx }) => {
  const reqCookie = cookie.parse(ctx.req.headers.cookie || '');
  const authToken = reqCookie.token;
  if (!authToken)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You are somehow missing the token in your cookie`'
    });

  const user = await prisma.user.findFirst({
    where: {
      auth_token: {
        auth_token: {
          equals: authToken
        }
      }
    }
  });

  if (!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: "A user with your auth token doesn't exist"
    });
  }

  console.log(user);

  return next({
    ctx: {
      ...ctx,
      user
    }
  });
});
