import { TRPCError } from '@trpc/server';

import { trpc } from '../trpc.js';

// You can use any variable name you like.
// We use t to keep things simple.

export const authProcedure = trpc.procedure.use(a => {
  console.log(a);
  throw new TRPCError({
    code: 'BAD_REQUEST',
    message: ''
  });
  return a.next();
});
