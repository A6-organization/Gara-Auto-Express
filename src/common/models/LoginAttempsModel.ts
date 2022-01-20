import { Model, DataTypes } from 'sequelize';
import { LoginAttempsCreation, LoginAttempsAttributes } from '../types/common';
import sequelize from '../../config/sequelize';

class LoginAttempsModel extends Model<
  LoginAttempsAttributes | LoginAttempsCreation
> {
  id: number;
  user_id: number;
  attemps: number;
  start_time: Date;
  end_time: Date;
}

LoginAttempsModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    attemps: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'login_attemps',
    timestamps: false,
    sequelize,
  }
);

export default LoginAttempsModel;
