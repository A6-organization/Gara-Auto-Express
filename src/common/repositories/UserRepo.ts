import { UserStatus } from './../../modules/auth/types/auth';
import LoginAttemptsModel from '../models/LoginAttemptsModel';
import UserModel from '../models/UserModel';
import { UserIncludeLoginAttempts, UsersAttributes } from '../types/common';

class UserRepository {
  async findAllUser(): Promise<UsersAttributes[]> {
    return UserModel.findAll({
      raw: true,
    });
  }

  async findUserByEmail(email: string): Promise<UsersAttributes> {
    return UserModel.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }

  async findUserDetailsByEmail(
    email: string
  ): Promise<UserIncludeLoginAttempts> {
    const temp = (await UserModel.findOne({
      where: {
        email,
      },
      include: [
        {
          model: LoginAttemptsModel,
          as: 'attempts',
        },
      ],
    })) as unknown;

    return temp as UserIncludeLoginAttempts;
  }

  async getAllUser() {
    return UserModel.findAll({});
  }

  async getUserWithStatus(status: UserStatus, attributes?: string[]) {
    return UserModel.findAll({
      attributes: attributes || ['id', 'roles', 'status', 'email'],
      where: {
        status,
      },
    });
  }
}

export default new UserRepository();
