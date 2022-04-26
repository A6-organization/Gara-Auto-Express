import { Model, DataTypes } from 'sequelize';
import { CarAttributes, CarCreation } from '../types/common';
import sequelize from '../../config/sequelize';

class CarModel extends Model<CarAttributes, CarCreation> {
  id: number;
  brand_id: number;
  name: string;
  price: number;
  discount_percent: number;
  description: string;
}

CarModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    price: {
      type: DataTypes.DECIMAL(10, 0),
    },
    discount_percent: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'cars',
    timestamps: false,
    sequelize,
  }
);

export default CarModel;
