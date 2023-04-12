import { z } from 'zod';
import cookie from 'cookie';
import { trpc } from '../../trpc.js';
import { createToken, loginUser, getUser } from './handler.js';
import { authProcedure, publicProcedure } from '../../procedures/index.js';

export const router = trpc.router({
  get: publicProcedure
    .input(
      z.object({
        discordUserId: z.string()
      })
    )
    .query(async req => {
      return await getUser(req.input.discordUserId);
    }),

  login: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async req => {
      const authToken = await loginUser(req.input.token);
      req.ctx.res.setHeader('Set-Cookie', authToken);
    }),

  createToken: publicProcedure
    .input(
      z.object({
        discordUserId: z.string()
      })
    )
    .mutation(async req => {
      await createToken(req.input.discordUserId);
    }),
  test: authProcedure.query(req => {
    console.log('test proc');
  })
});
