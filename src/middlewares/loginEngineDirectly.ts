import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../common/errors/types/UnaithorizedError';

export default async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const loginDirectlyValue = req.headers['web-engine-directly'];
  if (loginDirectlyValue) {
    return next();
  }
  return next(new UnauthorizedError());
};
