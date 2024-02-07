import mysql from 'mysql';

import { ENV } from '../env';

export const getDbConnection = () => {
    console.log('🔓 Database connection created');
    return mysql.createConnection({
        host: ENV.DATABASE_HOST,
        port: parseInt(ENV.DATABASE_PORT, 10),
        user: ENV.DATABASE_USER,
        password: ENV.DATABASE_PASSWORD,
        database: ENV.DATABASE_NAME,
    });
};
