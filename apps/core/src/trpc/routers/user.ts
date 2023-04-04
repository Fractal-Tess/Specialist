import { z } from 'zod';
import { trpc } from '../trpc.js';

export const router = trpc.router({
  get: trpc.procedure
    .input(
      z.object({
        discordUserId: z.string()
      })
    )
    .query(req => {
      console.log(`Got get request x for user ${req.input.discordUserId}`);
    }),
  createToken: trpc.procedure
    .input(
      z.object({
        discordUserId: z.string()
      })
    )
    .mutation(req => {
      console.log(`Got createToken call for user ${req.input.discordUserId}`);
    })
});
