import knex from 'knex';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Knex with the configuration
const db = knex({
    client: 'pg', // Using PostgreSQL client
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '5432', 10),
    }
});

export default db;