import 'dotenv/config';
import dns from 'node:dns';

// Windows sometimes hands Node an IPv6 link-local resolver that fails SRV lookups
// (mongodb+srv://) with ECONNREFUSED; force a public DNS server instead.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const required = ['MONGODB_URI', 'JWT_SECRET'];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};
