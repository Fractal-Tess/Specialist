import { createTRPCProxyClient, httpLink } from '@trpc/client';
import type { AppRouter } from '../../../core/src/trpc/server';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    // call subscriptions through websockets and the rest over http
    httpLink({
      url: `http://localhost:3001`,
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include'
        });
      }
    })
  ]
});
