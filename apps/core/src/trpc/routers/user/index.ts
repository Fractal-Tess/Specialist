import { z } from 'zod';
import { trpc } from '../../trpc.js';
import { createToken, loginUser, getUser } from './handler.js';

export const router = trpc.router({
  get: trpc.procedure
    .input(
      z.object({
        discordUserId: z.string()
      })
    )
    .query(async req => {
      return await getUser(req.input.discordUserId);
    }),

  login: trpc.procedure
    .input(z.object({ token: z.string() }))
    .mutation(async req => {
      return await loginUser(req.input.token);
    }),

  createToken: trpc.procedure
    .input(
      z.object({
        discordUserId: z.string()
      })
    )
    .mutation(async req => {
      return await createToken(req.input.discordUserId);
    })
});
