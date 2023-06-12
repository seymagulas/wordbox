import { db } from "./index";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export interface QuestionModel extends Model<InferAttributes<QuestionModel>, InferCreationAttributes<QuestionModel>> {
  id: CreationOptional<number>;
  user_id: number;
  quiz_id: number;
  question: string;
  answer: string;
  is_correct: boolean | null;
}

export const Question = db.define<QuestionModel>('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_correct: {
    type: DataTypes.BOOLEAN,
    defaultValue: null,
    allowNull: true
  }
});

(async () => {
  await Question.sync({alter: true});
})();

