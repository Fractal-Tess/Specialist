import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';

import { appRouter } from './router/router.js';
import { config } from '../config.js';
import { createContext } from './context.js';

export type AppRouter = typeof appRouter;

export const startTRPC = () => {
  createHTTPServer({
    middleware: cors(),
    router: appRouter,
    createContext
  }).listen(config.PORT);
};
