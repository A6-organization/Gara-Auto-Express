import LoginAttempsModel from '../models/LoginAttempsModel';
import UserModel from '../models/UserModel';

class UserRepository {
  async findAllUser() {
    return await UserModel.findAll({
      raw: true,
    });
  }

  async findUserByEmail(email: string) {
    return await UserModel.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }

  async findUserDetailsByEmail(email: string) {
    return await UserModel.findOne({
      where: {
        email,
      },
      include: [
        {
          model: LoginAttempsModel,
          as: 'attemps',
        },
      ],
    });
  }
}

export default new UserRepository();
