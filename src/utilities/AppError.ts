export default class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    // Set status based on status code
    this.status = this.determineStatus(statusCode);

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  private determineStatus(statusCode: number): string {
    switch (true) {
      case statusCode === 400:
        return 'Bad Request - Missing or invalid data';
      case statusCode === 401:
        return 'Unauthorized - Authentication required';
      case statusCode === 403:
        return 'Forbidden - Insufficient permissions';
      case statusCode === 404:
        return 'Not Found - Resource does not exist';
      case statusCode >= 500:
      default:
        return 'Unknown Error';
    }
  }
}
