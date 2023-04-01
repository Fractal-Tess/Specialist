import { Context } from './context.js';
import { initTRPC } from '@trpc/server';

export const trpc = initTRPC.context<Context>().create();
