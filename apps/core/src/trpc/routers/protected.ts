import { TRPCError } from '@trpc/server';

import { trpc } from '../trpc.js';
import { protectedProcedure } from '../middleware/auth.js';
// You can use any variable name you like.
// We use t to keep things simple.

const procedure = trpc.procedure.use(({ next }) => {
  return next();
});
export const router = trpc.router({
  test: procedure.query(() => {})
});
