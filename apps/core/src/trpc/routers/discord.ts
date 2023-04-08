import { getBot } from '../../discord/utils.js';
import { publicProcedure } from '../procedures/public.js';
import { trpc } from '../trpc.js';

export const router = trpc.router({
  getBot: publicProcedure.query(() => {
    return getBot();
  })
});
