import { DataTypes, Model } from 'sequelize/types';
import { ClientCouponAttributes, ClientCouponCreation } from '../types/common';
import sequelize from '../../config/sequelize';

class ClientCouponModel extends Model<
  ClientCouponAttributes,
  ClientCouponCreation
> {
  id: number;
  client_id: number;
  coupon_id: number;
  car_id: number;
  used_at: Date;
}

ClientCouponModel.init(
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
    coupon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    used_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'client_coupon',
    timestamps: false,
    sequelize,
  }
);

export default ClientCouponModel;
