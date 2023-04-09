import { router as userRouter } from './user/index.js';
import { router as discordRouter } from './discord/index.js';
import { router as audioRouter } from './audio/index.js';
import { router as imageRouter } from './image/index.js';
import { router as linkRouter } from './link/index.js';

import { trpc } from '../trpc.js';

export const appRouter = trpc.router({
  user: userRouter,
  discord: discordRouter,
  audio: audioRouter,
  image: imageRouter,
  link: linkRouter
});

export type AppRouter = typeof appRouter;
