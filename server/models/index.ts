import { dbConfig } from './config';
import { Sequelize } from 'sequelize';

export const db = new Sequelize(dbConfig.dbName, dbConfig.dbUser, dbConfig.dbPass, {
  host: dbConfig.dbHost,
  dialect: dbConfig.dbDialect
});

