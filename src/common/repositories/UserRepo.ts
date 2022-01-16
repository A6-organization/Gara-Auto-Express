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
}

export default new UserRepository();
