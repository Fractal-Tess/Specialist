import { initTRPC } from '@trpc/server';

import { router as publicRouter } from './public.js';
import { router as protectedRouter } from './protected.js';
import { trpc } from '../trpc.js';

const { mergeRouters } = initTRPC.create();
export const appRouter = trpc.router({
  get: user
});

export type AppRouter = typeof appRouter;
