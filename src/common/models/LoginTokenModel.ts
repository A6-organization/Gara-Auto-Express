import { Model, DataTypes } from 'sequelize';
import { LoginTokenAttributes, LoginTokenCreation } from '../types/common';
import sequelize from '../../config/sequelize';

class LoginTokenModel extends Model<LoginTokenAttributes | LoginTokenCreation> {
  id: number;
  token: string;
  user_id: number;
  created_at: Date;
}

LoginTokenModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'login_tokens',
    timestamps: false,
    sequelize,
  }
);

export default LoginTokenModel;
