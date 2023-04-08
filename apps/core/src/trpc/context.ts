import type { IncomingMessage, ServerResponse } from 'node:http';
import type { inferAsyncReturnType } from '@trpc/server';
import type { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';

export const createContext = async ({
  req,
  res
}: NodeHTTPCreateContextFnOptions<
  IncomingMessage,
  ServerResponse<IncomingMessage>
>) => {
  return {
    req,
    res
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
