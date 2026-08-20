import { env } from '../config/env.js';

export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const body = {
    success: false,
    message: err.message || 'Internal server error',
  };
  if (err.errors) body.errors = err.errors;
  if (env.nodeEnv === 'development' && statusCode === 500) {
    console.error(err.stack);
  }
  res.status(statusCode).json(body);
}
