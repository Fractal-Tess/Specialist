import { publicProcedure } from '../../../procedures/public.js';
import { trpc } from '../../../trpc.js';
import { get } from './handler.js';
import { z } from 'zod';

export const router = trpc.router({
  get: publicProcedure
    .input(z.object({ discordServerId: z.string() }))
    .query(req => {
      return get(req.input.discordServerId);
    })
});
