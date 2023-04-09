import { TRPCError } from '@trpc/server';

import { publicProcedure } from '../../procedures/public.js';
import { trpc } from '../../trpc.js';

export const router = trpc.router({
  get: publicProcedure.query(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Not implemented'
    });
  })
});
