import type { IncomingMessage, ServerResponse } from 'node:http';
import type { inferAsyncReturnType } from '@trpc/server';
import type { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';

import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export const createContext = async ({
  req,
  res
}: NodeHTTPCreateContextFnOptions<
  IncomingMessage,
  ServerResponse<IncomingMessage>
>) => {
  if (req.headers.authorization) {
    const user = jwt.decode(req.headers.authorization);
  }

  // Stuff...

  return {
    user: ''
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
