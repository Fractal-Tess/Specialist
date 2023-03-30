import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { initTRPC, TRPCError } from '@trpc/server';
import cors from 'cors';
import { z } from 'zod';

import { config } from '../config.js';
import { getUser, getBot, getServer } from './discord.js';

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;
interface User {
  id: string;
  name: string;
}

const appRouter = router({
  getUser: publicProcedure.input(z.string()).query(async (req) => {
    try {
      return await getUser(req.input);
    } catch (error) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `User with id ${req.input} not found`,
      });
    }
  }),
  getBot: publicProcedure.query(() => {
    return getBot();
  }),
  getServer: publicProcedure.input(z.string()).query((req) => {
    return getServer(req.input);
  }),
});

export type AppRouter = typeof appRouter;

export const startTRPC = () => {
  createHTTPServer({
    middleware: cors(),
    router: appRouter,
    createContext() {
      return {};
    },
  }).listen(config.PORT);
};
