import { trpc } from '../../trpc.js';
import { router as serverRouter } from './server/index.js';
import { router as botRouter } from './bot/index.js';

export const router = trpc.router({
  server: serverRouter,
  bot: botRouter
});
