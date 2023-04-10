import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';

import { appRouter } from './routers/index.js';
import { config } from '../config.js';
import { createContext } from './context.js';

export type AppRouter = typeof appRouter;

export const startTRPC = () => {
  createHTTPServer({
    middleware: cors({
      credentials: true,
      origin: e => {
        console.log(e);
        return true;
      }
    }),
    router: appRouter,
    createContext
  }).listen(config.PORT);
};
