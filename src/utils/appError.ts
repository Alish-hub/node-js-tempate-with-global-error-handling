class AppError extends Error {
  public status: number;
  public isOperational: boolean;

  constructor(
    status: number = 500,
    message: string,
    isOperational: boolean = true
  ) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;

    // Ensure the correct prototype chain
    // Object.setPrototypeOf(this, new.target.prototype);

    // Capture stack trace
    // Error.captureStackTrace(this, this.constructor);
    Error.captureStackTrace(this);
  }
}

export default AppError;
