import { Request, Response } from 'express';
import { logger } from '../../../common/helpers/logger';
import InternalServerError from '../../../common/errors/types/InternalServerError';
import UserRepo from '../../../common/repositories/UserRepo';
import TokenServices from '../services/TokenServices';
import messages from '../../../common/messages';
import { SignInBody, SignUpBody } from '../types/auth';
import BadRequestError from '../../../common/errors/types/BadRequestError';
import UnauthorizedError from '../../../common/errors/types/UnaithorizedError';
import { BLOCK_IPS } from '../../../common/constants';
class AuthController extends TokenServices {
  apiCheck = async (_req: Request, res: Response) => {
    try {
      const result = await UserRepo.findAllUser();
      res.json(result);
    } catch (error) {
      logger.error(error);
      throw new InternalServerError();
    }
  };

  signUpAccount = async (
    req: Request<unknown, unknown, SignUpBody>,
    res: Response
  ) => {
    const userIP = req.socket.remoteAddress;
    const { email, password, roles, gCaptcha } = req.body;
    try {
      if (BLOCK_IPS.includes(userIP)) {
        throw new Error(messages.authMessage.IpAddressBeenBlock);
      }
      await this.signUpAccountService(email, password, roles, gCaptcha, userIP);
      res.send('Account has been created');
    } catch (error) {
      logger.error(error);
      if (error.message) {
        throw new BadRequestError(error.message);
      }
      throw new InternalServerError(messages.somethingWentWrongMessage);
    }
  };

  generateAdminAccount = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      res.send(`Welcome to GARA-AUTO ADMIN: `);
    } catch (error) {
      logger.error(error);
      throw new InternalServerError(messages.somethingWentWrongMessage);
    }
  };

  login = async (req: Request<unknown, unknown, SignInBody>, res: Response) => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await this.loginService(
        email,
        password
      );
      res.json({
        statusCode: 200,
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          authorization: `Bearer ${refreshToken}`,
        },
      });
    } catch (error) {
      logger.error(error);
      if (error.message) {
        throw new BadRequestError(error.message);
      }
      throw new InternalServerError(messages.somethingWentWrongMessage);
    }
  };

  regenarateAccessToken = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const token = req.headers.authorization.split(' ')[1];
      const result = await this.regenarateAccessTokenService(token, user);
      res.json({
        statusCode: 200,
        headers: { authorization: `Bearer ${result}` },
      });
    } catch (error) {
      logger.error(error);
      if (error.message) {
        throw new UnauthorizedError(error.message);
      }
      throw new InternalServerError(error.message);
    }
  };

  testIntercom = async (req: Request, res: Response) => {
    try {
      console.log('testIntercom body', req.body);
      res.send('yeah its oke');
    } catch (error) {
      throw new InternalServerError();
    }
  };
}

export default new AuthController();
