import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/sequelize';
import { UserRoles, UserStatus } from '../../modules/auth/types/auth';
import { UsersAttributes, UsersCreation } from '../types/common';

class UserModel extends Model<UsersAttributes | UsersCreation> {
  id: number;
  password: string;
  roles: UserRoles | string;
  status: UserStatus | string;
  email: string;
  created_at: Date;
  recent_login_time: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    roles: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: UserRoles.CLIENT,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: UserStatus.INITIAL,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    recent_login_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
    sequelize,
  }
);

export default UserModel;
