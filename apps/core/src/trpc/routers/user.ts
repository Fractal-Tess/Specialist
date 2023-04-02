import { z } from 'zod';
import { trpc } from '../trpc.js';

const user = trpc.router({
  get: trpc.procedure.input(z.string()).query(input => {})
});
