import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/Errors/AppError';
import { errorHandler } from '../utils/Errors/ErrorHandler';
const errorM = async (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  await errorHandler.handleError(err, res);
};

export { errorM };
