import { Model, DataTypes } from 'sequelize';
import { ClientAttributes, ClientCreation } from '../types/common';
import sequelize from '../../config/sequelize';

class ClientModel extends Model<ClientAttributes, ClientCreation> {
  declare id: number;
  declare user_id: number;
  declare first_name: string;
  declare last_name: string;
  declare gender: string;
  declare phone_number: string;
  declare dob: Date;
  declare address_country: string;
  declare address_province: number;
  declare address_district: number;
  declare address_ward: number;
  declare address_detail: string;
  declare timezone: string;
  declare stripe_customer_id: string;
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
