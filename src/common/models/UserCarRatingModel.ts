import { Model, DataTypes } from 'sequelize';
import {
  UserCarRatingAttributes,
  UserCarRatingCreation,
} from '../types/common';
import sequelize from '../../config/sequelize';
import UserModel from './UserModel';
import CarModel from './CarModel';

class UserCarRatingModel extends Model<
  UserCarRatingAttributes | UserCarRatingCreation
> {
  id: number;
  name: string;
}

UserCarRatingModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    carId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CarModel,
        key: 'id',
      },
      field: 'car_id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel, // 'Movies' would also work
        key: 'id',
      },
      field: 'user_id',
    },
    ratingPoint: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'rating_point',
    },
  },
  {
    tableName: 'user_car_rating',
    timestamps: false,
    sequelize,
  }
);

CarModel.belongsToMany(UserModel, { through: UserCarRatingModel });
UserModel.belongsToMany(CarModel, { through: UserCarRatingModel });

export default UserCarRatingModel;
