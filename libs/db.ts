import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;


if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
    throw new Error('Database configuration missing. Please check your .env file');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, '', {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to true to see SQL queries in console
    pool: {
        max: 5, // Maximum number of connection in pool
        min: 0, // Minimum number of connection in pool
        acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // The maximum time, in milliseconds, that a connection can be idle before being released
    },
    retry: {
        max: 3 // Maximum amount of connection retries
    },
    dialectOptions: {
        connectTimeout: 60000 // 60 seconds
    }
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
