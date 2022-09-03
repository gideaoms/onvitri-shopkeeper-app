export const config = {
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
  API_URL: process.env.API_URL as string,
  SENTRY_DSN: process.env.SENTRY_DSN as string,
};
