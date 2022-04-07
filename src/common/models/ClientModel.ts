import { Model, DataTypes } from 'sequelize/types';
import { ClientAttributes, ClientCreation } from '../types/common';
import sequelize from '../../config/sequelize';

class ClientModel extends Model<ClientAttributes, ClientCreation> {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  dob: Date;
  address_country: string;
  address_province: number;
  address_district: number;
  address_ward: number;
  address_detail: string;
  timezone: string;
  stripe_customer_id: string;
}

ClientModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
    },
    last_name: {
      type: DataTypes.STRING(50),
    },
    gender: {
      type: DataTypes.STRING(10),
    },
    phone_number: {
      type: DataTypes.STRING(20),
    },
    dob: {
      type: DataTypes.DATE,
    },
    address_country: {
      type: DataTypes.STRING(30),
    },
    address_province: {
      type: DataTypes.INTEGER,
    },
    address_district: {
      type: DataTypes.INTEGER,
    },
    address_ward: {
      type: DataTypes.INTEGER,
    },
    address_detail: {
      type: DataTypes.STRING(100),
    },
    timezone: {
      type: DataTypes.STRING(30),
    },
    stripe_customer_id: {
      type: DataTypes.STRING(40),
    },
  },
  {
    tableName: 'client_info',
    timestamps: false,
    sequelize,
  }
);

export default ClientModel;
