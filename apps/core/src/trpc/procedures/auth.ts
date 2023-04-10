import { trpc } from '../trpc.js';
import jwt from 'jsonwebtoken';
import { config } from '../../config.js';
import { TRPCError } from '@trpc/server';

export const authProcedure = trpc.procedure.use(({ next, ctx }) => {
  console.log(ctx.req.headers);
  const authorizationHeader = ctx.req.headers.cookie;
  if (!authorizationHeader)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: "You are missing the 'authorization' header"
    });

  if (!jwt.verify(authorizationHeader, config.JWT_SECRET))
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'The signature of JWT is not valid'
    });

  const user = jwt.decode(authorizationHeader);

  console.log(user);

  return next({
    ctx: {
      ...ctx,
      user
    }
  });
});
