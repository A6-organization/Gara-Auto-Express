import { DataTypes, Model } from 'sequelize/types';
import {
  CarAppearanceAttributes,
  CarAppearanceCreation,
} from '../types/common';
import sequelize from '../../config/sequelize';

class CarAppearanceModel extends Model<
  CarAppearanceAttributes | CarAppearanceCreation
> {
  id: number;
  car_id: number;
  img: string;
  color: string;
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
