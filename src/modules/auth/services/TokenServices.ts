import LoginTokenRepo from '../../../common/repositories/LoginTokenRepo';
import env from '../../../config/env';
import { sign } from 'jsonwebtoken';
import { logger } from '../../../common/helpers/logger';
import messages from '../../../common/messages';
import { TokenType, UserRoles, UserStatus } from '../types/auth';
import UserRepo from '../../../common/repositories/UserRepo';
import {
  generateSaltPassword,
  compareSaltPassword,
} from '../../../common/helpers/bcrypt';
import UserModel from '../../../common/models/UserModel';
import sendGridMail from '../../../common/axios/sendGridMail';
import { UsersAttributes } from '../../../common/types/common';
import dayjs from 'dayjs';
import LoginAttempsRepo from '../../../common/repositories/LoginAttempsRepo';
import { compareDate1GreaterDate2 } from '../../../common/helpers/dateTime';
import GoogleRecaptchaService from '../../../common/services/GoogleRecaptchaService';

class TokenServices {
  protected generateToken = async (email: string, type: TokenType) => {
    try {
      // we want to generate difference algorhythm with difference type of token
      // to increate our protection. In our case ACCESS token use HS256 algorithm
      // REFRESH token in other hand use HS512
      let token = '';
      if (type === 'Access') {
        token = sign({ user: email, type: TokenType.ACCESS }, env.jwtSecret, {
          //HS256 - HMAC using SHA-256 hash algorithm
          expiresIn: env.jwtExpiredAccessTokenTime,
        });
      } else {
        token = sign(
          {
            user: email,
            type: TokenType.REFRESH,
          },
          env.jwtSecret,
          {
            // HS512 - HMAC using SHA-512 hash algorithm
            algorithm: 'HS512',
            noTimestamp: true,
            expiresIn: env.jwtExpiredRefreshTokenTime,
          }
        );
      }
      return token;
    } catch (error) {
      logger.error(error);
      throw new Error(messages.authMessage.NotGenerateToken);
    }
  };

  protected saveRefreshToken = async (user_id: number, token: string) => {
    try {
      const result = await LoginTokenRepo.generateRefreshToken(token, user_id);
      return result;
    } catch (error) {
      logger.error(error);
      throw new Error(messages.authMessage.NotSaveToken);
    }
  };

  protected handleRefreshToken = async (user: UsersAttributes) => {
    try {
      const tokenExist = await LoginTokenRepo.getRefreshTokenByUserId(user.id);
      if (tokenExist === null) {
        const token = await this.generateToken(user.email, TokenType.REFRESH);
        const newToken = await LoginTokenRepo.generateRefreshToken(
          token,
          user.id
        );

        logger.info(`Generated Refresh Token for user: ${user.email}`);
        return newToken.token;
      } else {
        let token = '';
        const afterCreated7Days = dayjs(tokenExist.created_at).add(7, 'd');
        const currentTime = dayjs(new Date());

        if (currentTime.diff(afterCreated7Days) > 0) {
          const genToken = await this.generateToken(
            user.email,
            TokenType.REFRESH
          );
          await LoginTokenRepo.updateTokenAndDateById(
            genToken,
            new Date(),
            tokenExist.id
          );

          logger.info(`Updated Refresh Token for user: ${user.email}`);

          token = genToken;
        } else {
          token = tokenExist.token;
        }

        return token;
      }
    } catch (error) {
      logger.error(error);
      throw new Error(`EXCEPTION handleTokenRefreshToken(): ${error}`);
    }
  };

  protected async signUpAccountService(
    email: string,
    password: string,
    roles: string,
    gCaptcha: string,
    userIP: string
  ) {
    const arrOfRoles = ['CLIENT', 'EXPERT', 'SALE'];

    if (roles === undefined) roles = UserRoles.CLIENT;
    else {
      if (!arrOfRoles.includes(roles.toUpperCase())) {
        throw new Error(messages.userMessage.RoleDoesntExist);
      }
      roles = roles.toUpperCase();
    }

    const gCaptchaResponse = await GoogleRecaptchaService.verifyRecaptcha(
      userIP,
      gCaptcha
    );

    if (gCaptchaResponse !== 'valid') {
      throw new Error(gCaptchaResponse);
    }

    const userExist = await UserRepo.findUserByEmail(email);

    if (userExist) {
      throw new Error(messages.userMessage.EmailExist);
    }

    password = await generateSaltPassword(password);

    await UserModel.create({
      status: UserStatus.INITIAL,
      created_at: new Date(),
      email,
      password,
      roles,
      recent_login_time: null,
    });

    const name = email.split('@')[0];
    await sendGridMail.sendSignUpEmail(email, name);
  }

  protected loginService = async (email: string, password: string) => {
    const [user, userWithAttemps] = await Promise.all([
      UserRepo.findUserByEmail(email),
      UserRepo.findUserDetailsByEmail(email),
    ]);

    if (user === null) {
      throw new Error(messages.authMessage.EmailNotExist);
    }

    switch (user.status) {
      case UserStatus.INITIAL:
        throw new Error(messages.authMessage.AccountHaventActivated);
      case UserStatus.SUSPEND:
        throw new Error(messages.authMessage.BanAccount);
      default:
        break;
    }

    if (userWithAttemps['attemps'] === null) {
      await LoginAttempsRepo.createNewRecord(user.id);

      logger.info(`Create new Login Attemps for user with id: ${user.id}`);
    } else {
      const end_time = userWithAttemps['attemps']['end_time'];
      const crrDate = new Date();

      if (compareDate1GreaterDate2(crrDate, end_time) === true) {
        await LoginAttempsRepo.updateRecord(
          user.id,
          7,
          crrDate,
          dayjs(crrDate).add(2, 'h').toDate()
        );

        logger.info(`Update new Login Attemps for user with id: ${user.id}`);
      }
    }

    const la = await LoginAttempsRepo.getRecordByUserID(user.id);

    const correctPassword = await compareSaltPassword(password, user.password);
    if (!correctPassword) {
      if (la.attemps === 0) {
        await UserModel.update(
          {
            status: UserStatus.SUSPEND,
          },
          {
            where: {
              id: user.id,
            },
          }
        );
      } else {
        la.attemps = la.attemps - 1;
        await la.save();
      }

      throw new Error(messages.authMessage.PasswordNotMatch);
    }
    const accessToken = await this.generateToken(user.email, TokenType.ACCESS);
    const refreshToken = await this.handleRefreshToken(user);

    return { accessToken, refreshToken };
  };

  protected regenarateAccessTokenService = async (
    token: string,
    user: UsersAttributes
  ) => {
    const loginTokenRecord = await LoginTokenRepo.getRefreshTokenByUserId(
      user.id
    );

    if (token !== loginTokenRecord.token) {
      throw new Error(messages.authMessage.TokenExpired);
    }

    const today = dayjs(new Date());
    const dbDate = dayjs(loginTokenRecord.created_at);

    if (today.diff(dbDate) > 0) {
      throw new Error(messages.authMessage.TokenExpired);
    }

    const accessToken = await this.generateToken(user.email, TokenType.ACCESS);

    return accessToken;
  };
}

export default TokenServices;
