import { Op, Sequelize } from 'sequelize';
import UserModel from '../models/UserModel';
import dayjs from 'dayjs';

class UserRepository {
  async findAllUser() {
    return await UserModel.findAll({
      raw: true,
    });
  }
}

export default new UserRepository();
