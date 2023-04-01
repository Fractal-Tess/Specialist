import z from 'zod';
import dotenv from 'dotenv';

dotenv.config();

export const config = z
  .object({
    TOKEN: z.string(),
    PORT: z.string().transform(s => +s),
    JWT_SECRET: z.string()
  })
  .parse(process.env);
