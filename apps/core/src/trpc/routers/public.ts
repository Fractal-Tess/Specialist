import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import {
  handleGetAudios,
  handleGetBot,
  handleGetImages,
  handleGetServer,
  handleGetUser
} from '../handlers.js';
import { createToken, loginUser } from '../../discord/auth.js';

const t = initTRPC.create();
const procedure = t.procedure;

export const router = t.router({
  getUser: procedure.input(z.string()).query(req => handleGetUser(req.input)),
  getBot: procedure.query(() => handleGetBot()),
  getServer: procedure
    .input(z.string())
    .query(req => handleGetServer(req.input)),
  getImages: procedure.query(async () => await handleGetImages()),
  getAudios: procedure.query(async () => await handleGetAudios()),

  createUserToken: procedure
    .input(z.string())
    .mutation(req => createToken(req.input)),
  loginUser: procedure.input(z.string()).mutation(req => loginUser(req.input))
});
