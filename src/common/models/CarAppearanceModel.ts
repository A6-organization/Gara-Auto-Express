import { Model, DataTypes } from 'sequelize';
import {
  CarAppearanceAttributes,
  CarAppearanceCreation,
} from '../types/common';
import sequelize from '../../config/sequelize';

class CarAppearanceModel extends Model<
  CarAppearanceAttributes | CarAppearanceCreation
> {
  declare id: number;
  declare car_id: number;
  declare img: string;
  declare color: string;
}

CarAppearanceModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
    },
    color: {
      type: DataTypes.STRING(30),
    },
  },
  {
    tableName: 'car_appearance',
    timestamps: false,
    sequelize,
  }
);

export default CarAppearanceModel;
