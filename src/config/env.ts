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
};
