import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { logger } from '../../../common/helpers/logger';
import InternalServerError from '../../../common/errors/types/InternalServerError';

class AuthController {
  apiCheck = async (_req: Request, res: Response) => {
    try {
      res.send('Testing complete no error occurs');
    } catch (error) {
      logger.error(error);
      throw new InternalServerError();
    }
  };
}

export default new AuthController();
