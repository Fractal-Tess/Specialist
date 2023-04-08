import { trpc } from '../trpc.js';
import { decode, verify } from 'jsonwebtoken';
import { config } from '../../config.js';
import { TRPCError } from '@trpc/server';

export const authProcedure = trpc.procedure.use(({ next, ctx }) => {
  const authorizationHeader = ctx.req.headers.authorization;
  if (!authorizationHeader)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: "You are missing the 'authorization' header"
    });

  if (!verify(authorizationHeader, config.JWT_SECRET))
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'The signature of JWT is not valid'
    });

  const user = decode(authorizationHeader);

  console.log(user);

  return next({
    ctx: {
      ...ctx,
      user
    }
  });
});
