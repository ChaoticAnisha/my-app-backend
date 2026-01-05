export class HttpError extends Error {
  status: number;
  errors?: any;

  constructor(message: string, status: number = 500, errors?: any) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

