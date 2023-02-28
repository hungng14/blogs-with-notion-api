export const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT as string, 10) || 6379;
export const IS_REDIS_ENABLED = process.env.REDIS_ENABLED === 'true' || false;
export const REDIS_TTL = parseInt(process.env.REDIS_TTL as string, 10) || 300; //seconds