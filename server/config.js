import 'dotenv/config';
export const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || '7d',
  clientOrigin: process.env.CLIENT_ORIGIN,
  cookieSecure: process.env.COOKIE_SECURE === 'true'
};

