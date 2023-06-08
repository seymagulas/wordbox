import { Dialect } from "sequelize";

type dbConfigProps = {
  dbName: string,
  dbUser: string,
  dbPass: string,
  dbHost: string,
  dbDialect: Dialect
}

export const dbConfig: dbConfigProps = {
  dbName: 'word_box',
  dbUser: 'root',
  dbPass: 'Root123.',
  dbHost: 'localhost',
  dbDialect: 'postgres'
};
