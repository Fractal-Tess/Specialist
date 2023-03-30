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
    }
  };
};

export const alert = createStore();
