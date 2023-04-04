import { trpc } from '../trpc.js';

export const authProcedure = trpc.procedure.use(({ next, ctx }) => {
  return next();
});
