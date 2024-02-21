import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    JWT_SECRET: z.string(),
});

export const ENV = envSchema.parse(process.env);
