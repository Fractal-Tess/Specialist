import { trpc } from '../trpc.js';

export const authMiddleware = trpc.procedure.use(({ next, ctx }) => {
  // Do auth and throw if !user
  return next();
});
