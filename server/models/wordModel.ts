import { db } from "./index";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export interface WordModel extends Model<InferAttributes<WordModel>, InferCreationAttributes<WordModel>> {
  id: CreationOptional<number>;
  user_id: number;
  word: string;
  meaning: string;
  correct_count: number;
}

export const Word = db.define<WordModel>('Word', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false
  },
  meaning: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  correct_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

(async () => {
  await Word.sync({alter: true});
})();

