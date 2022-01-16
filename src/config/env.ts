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

  //jwt
  jwtSecret: process.env.ENV_SECRET,
  jwtExpiredAccessTokenTime: process.env.EXPIRED_ACCESS_TOKEN,
  jwtExpiredRefreshTokenTime: process.env.EXPIRED_REFRESH_TOKEN,

  //sendgrid
  sendGridEmail: process.env.SENDGRID_EMAIL,
  sendGridPassword: process.env.SENDGRID_PASSWORD,
  sendGridApiKey: process.env.SENDGRID_API_KEY,
  sendGridSignUpTemplateId: process.env.SENDGRID_SIGNUP_TEMPLATE_ID,
  sendGridFromEmail: process.env.SENDGRID_FROM_EMAIL,
  sendGridFromEmailName: process.env.SENDGRID_FROM_EMAIL_NAME,
  sendGridApiUrl: process.env.SENDGRID_API_URL,
};
