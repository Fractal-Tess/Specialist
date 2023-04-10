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
      const c = cookie.serialize(
        'authToken',
        'g1OlXzPPsA5VDMRALfAOqLzls1sQAk9u',
        {
          path: '/',
          expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 5)
          )
        }
      );

      console.log('req');
      req.ctx.res.setHeader('set-cookie', c);
      // loginUser(req.input.token, req.ctx.res.setHeader);
    }),

  createToken: publicProcedure
    .input(
      z.object({
        discordUserId: z.string()
      })
    )
    .mutation(async req => {
      return await createToken(req.input.discordUserId);
    }),
  test: authProcedure.query(req => {
    console.log('test proc');
  })
});
