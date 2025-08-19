import "dotenv/config";

const rawOrigins = process.env.CLIENT_ORIGIN || "";
// allow a single origin or comma-separated list
const clientOrigins = rawOrigins.split(",").map(s => s.trim()).filter(Boolean);

export const config = {
  port: process.env.PORT || 5000,             
  mongoUri: process.env.MONGO_URI,            
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || "7d",
  clientOrigin: clientOrigins.length <= 1 ? clientOrigins[0] : clientOrigins,
  cookieSecure: process.env.COOKIE_SECURE === "true",
  isProd: process.env.NODE_ENV === "production",
};
