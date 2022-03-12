import { Sequelize, Dialect } from 'sequelize';
import env from '../config/env';

const { database } = env;
console.log('database: ', database);

console.log('its ok');

const {
  database: databaseName,
  dialect,
  username,
  password,
  port,
  resource,
} = database;

export default new Sequelize(
  `${dialect}://${username}:${password}@${resource}.database.windows.net:${port}`,
  {
    dialect: dialect as Dialect,
    database: databaseName,
    username,
    password,
    retry: {
      max: 3,
    },
  }
);
