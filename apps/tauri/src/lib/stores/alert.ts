import { TRPCClientError } from '@trpc/client';
import { writable } from 'svelte/store';

type Alert = {
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
};
const createStore = () => {
  const { subscribe, set } = writable<Alert | null>(null);

  let timeoutId: NodeJS.Timeout;
  return {
    subscribe,
    show: (alert: Alert) => {
      clearTimeout(timeoutId);
      // Show the wanted alert
      set(alert);
      // After 3 seconds, purge the alert
      timeoutId = setTimeout(() => set(null), 3_000);
    },
    hide: () => {
      clearTimeout(timeoutId);
      set(null);
    },
    handleError: (error: any) => {
      if (error instanceof TRPCClientError)
        alert.show({
          level: 'error',
          message: error.message
        });
      else
        alert.show({
          level: 'error',
          message: 'Unknown error instance, look at console'
        });
    }
  };
};

export const alert = createStore();
