import { initTRPC } from '@trpc/server';

import { router as publicRouter } from './public.js';
import { router as protectedRouter } from './protected.js';

const { mergeRouters } = initTRPC.create();

export const appRouter = mergeRouters(publicRouter, protectedRouter);

export type AppRouter = typeof appRouter;
