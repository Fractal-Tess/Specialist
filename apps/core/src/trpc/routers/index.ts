import { router as userRouter } from './user.js';
import { router as discordRouter } from './discord.js';

import { trpc } from '../trpc.js';

export const appRouter = trpc.router({
  user: userRouter,
  discord: discordRouter
});

export type AppRouter = typeof appRouter;
