import postgres from 'postgres';

import { ENV } from './env';

const sql = postgres({
    host: ENV.DATABASE_HOST,
    port: parseInt(ENV.DATABASE_PORT, 10),
    user: ENV.DATABASE_USER,
    password: ENV.DATABASE_PASSWORD,
    database: ENV.DATABASE_NAME,
});

console.log('🔓 Database connection created');

export default sql;
