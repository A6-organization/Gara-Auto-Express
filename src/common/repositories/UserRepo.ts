import { UserStatus } from './../../modules/auth/types/auth';
import LoginAttemptsModel from '../models/LoginAttemptsModel';
import UserModel from '../models/UserModel';

class UserRepository {
  async findAllUser() {
    return UserModel.findAll({
      raw: true,
    });
  }

  async findUserByEmail(email: string) {
    return UserModel.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }

  async findUserDetailsByEmail(email: string) {
    return UserModel.findOne({
      where: {
        email,
      },
      include: [
        {
          model: LoginAttemptsModel,
          as: 'attempts',
        },
      ],
    });
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
