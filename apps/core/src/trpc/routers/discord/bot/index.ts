import { publicProcedure } from '../../../procedures/public.js';
import { trpc } from '../../../trpc.js';
import { get } from './handler.js';

export const router = trpc.router({
  get: publicProcedure.query(() => {
    return get();
  })
});
