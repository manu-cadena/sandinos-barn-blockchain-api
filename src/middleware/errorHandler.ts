import { Request, Response, NextFunction } from 'express';
import AppError from '../utilities/AppError';

interface ErrorResponse {
  success: boolean;
  status: string;
  statusCode: number;
  message: string;
  stack?: string;
}

const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err } as AppError;
  error.message = err.message;

  // Log error for debugging
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Handle different error types
  if (err.name === 'ValidationError') {
    const message = 'Invalid data provided';
    error = new AppError(message, 400);
  }

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Default to 500 server error if not an AppError
  if (!(err instanceof AppError)) {
    error = new AppError('Internal Server Error', 500);
  }

  const errorResponse: ErrorResponse = {
    success: false,
    status: error.status || 'Internal Server Error',
    statusCode: error.statusCode || 500,
    message: error.message || 'Something went wrong',
  };

  // Only show stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(errorResponse.statusCode).json(errorResponse);
};

export default errorHandler;
