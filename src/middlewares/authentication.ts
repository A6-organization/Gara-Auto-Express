import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../common/errors/types/UnaithorizedError';
import UserRepo from '../common/repositories/UserRepo';
import { TokenType } from '../modules/auth/types/auth';

export default async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.headers && req.headers.authorization) {
    const json = jwt.decode(req.headers.authorization.split(' ')[1]);
    const type = json['type'] as string;
    const email = json['user'] as string;

    if (type === TokenType.ACCESS) {
      if (email) {
        const user = await UserRepo.findUserByEmail(email);
        if (user) {
          req.user = user;
          return next();
        } else {
          return next(new UnauthorizedError());
        }
      } else {
        return next(new UnauthorizedError());
      }
    } else {
      return next(new UnauthorizedError());
    }
  } else {
    return next(new UnauthorizedError());
  }
};
