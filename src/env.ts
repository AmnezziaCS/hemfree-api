import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
});

export const ENV = envSchema.parse(process.env);
