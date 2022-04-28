import { Model, DataTypes } from 'sequelize';
import { BrandAttributes, BrandCreation } from '../types/common';
import sequelize from '../../config/sequelize';

class BrandModel extends Model<BrandAttributes | BrandCreation> {
  declare id: number;
  declare name: string;
}

BrandModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    descriptions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'brand',
    timestamps: false,
    sequelize,
  }
);

export default BrandModel;
