import { Model, DataTypes } from 'sequelize';
import { WishListAttributes, WishListCreation } from '../types/common';
import sequelize from '../../config/sequelize';

class WishListModel extends Model<WishListAttributes | WishListCreation> {
  id: number;
  client_id: number;
  car_id: number;
}

WishListModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'wish_list',
    timestamps: false,
    sequelize,
  }
);

export default WishListModel;
