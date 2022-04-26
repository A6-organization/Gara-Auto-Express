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
import ErrorRecorderRepo from '../../../common/repositories/ErrorRecorderRepo';
import sendGridMail from '../../../common/axios/sendGridMail';
class AuthController extends TokenServices {
  apiCheck = async (_req: Request, res: Response) => {
    try {
      const result = await UserRepo.findAllUser();
      await sendGridMail.sendGridSignUpTemplate(result[1]);
      res.json(result);
    } catch (error) {
      logger.error(error, { reason: 'EXCEPTION at apiCheck()' });
      throw new InternalServerError();
    }
  };

  signUpAccount = async (
    req: Request<unknown, unknown, SignUpBody>,
    res: Response
  ) => {
    const userIP = req.socket.remoteAddress;
    const { firstName, lastName, email, password, roles, gCaptcha } = req.body;
    try {
      if (BLOCK_IPS.includes(userIP)) {
        throw new Error(messages.authMessage.IpAddressBeenBlock);
      }
      await this.signUpAccountService(
        firstName,
        lastName,
        email,
        password,
        roles,
        gCaptcha,
        userIP
      );
      res.send('Account has been created');
    } catch (error) {
      logger.error(error, { reason: 'EXCEPTION at signUpAccount()' });
      await ErrorRecorderRepo.logger('signUpAccount()', String(error));
      if (error.message) {
        throw new BadRequestError(error.message);
      }
      throw new InternalServerError(messages.somethingWentWrongMessage);
    }
  };

  generateAdminAccount = async (req: Request, res: Response) => {
    const { email, role } = req.body;
    try {
      const data = await this.signUpAdminService(email, role);
      const message = `${
        role.charAt(0).toUpperCase() + role.slice(1)
      } account has been created`;
      res.json({
        message,
        data,
      });
    } catch (error) {
      logger.error(error, { reason: 'EXCEPTION at generateAdminAccount()' });
      await ErrorRecorderRepo.logger('generateAdminAccount()', String(error));
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
          authorization: `Bearer ${accessToken.trim()}`,
        },
        body: {
          authorization: `Bearer ${refreshToken.trim()}`,
        },
      });
    } catch (error) {
      logger.error(error, { reason: 'EXCEPTION at login()' });
      await ErrorRecorderRepo.logger('login()', String(error));
      if (error.message) {
        throw new BadRequestError(error.message);
      }
      throw new InternalServerError(messages.somethingWentWrongMessage);
    }
  };

  loginDirectly = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const { accessToken, refreshToken } = await this.loginDirectlyService(
        email
      );

      res.json({
        statusCode: 200,
        headers: {
          authorization: `Bearer ${accessToken.trim()}`,
        },
        body: {
          authorization: `Bearer ${refreshToken.trim()}`,
        },
      });
    } catch (error) {
      logger.error(error, { reason: 'EXCEPTION at loginDirectly()' });
      await ErrorRecorderRepo.logger('loginDirectly()', String(error));
      if (error.message) {
        throw new UnauthorizedError(error.message);
      }
      throw new InternalServerError(error.message);
    }
  };

  regenerateAccessToken = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      const token = req.headers.authorization.split(' ')[1];
      const result = await this.regenerateAccessTokenService(token, user);
      res.json({
        statusCode: 200,
        headers: { authorization: `Bearer ${result.trim()}` },
      });
    } catch (error) {
      logger.error(error, {
        reason: 'EXCEPTION at regenerateAccessTokenService()',
      });
      await ErrorRecorderRepo.logger(
        'regenerateAccessTokenService()',
        String(error)
      );
      if (error.message) {
        throw new UnauthorizedError(error.message);
      }
      throw new InternalServerError(error.message);
    }
  };
}

export default new AuthController();
