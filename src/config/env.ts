import dotenv from 'dotenv';

export const Environment = {
  Local: 'local',
  Development: 'development',
  Production: 'production',
};

dotenv.config({
  path: '.env',
});

export default {
  port: process.env.PORT,

  database: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password', // if blank then set null
    database: process.env.DB_NAME || 'garaauto',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    // logging: process.env.NODE_ENV === Environment.Local,
    port: parseInt(process.env.DB_PORT) || 3306,
  },
};
