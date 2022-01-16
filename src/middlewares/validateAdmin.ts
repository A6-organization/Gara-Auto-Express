import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../common/errors/types/UnaithorizedError';
import { UserRoles } from '../modules/auth/types/auth';

export default (req: Request, _res: Response, next: NextFunction) => {
  const { email } = req.user;
  if (email === UserRoles.ADMIN) {
    return next();
  } else {
    return next(new UnauthorizedError());
  }
};
