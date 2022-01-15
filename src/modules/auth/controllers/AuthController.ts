import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { logger } from '../../../common/helpers/logger';
import InternalServerError from '../../../common/errors/types/InternalServerError';
import UserRepo from '../../../common/repositories/UserRepo';

class AuthController {
  apiCheck = async (_req: Request, res: Response) => {
    try {
      const result = await UserRepo.findAllUser();
      res.json(result);
    } catch (error) {
      logger.error(error);
      throw new InternalServerError();
    }
  };
}

export default new AuthController();
