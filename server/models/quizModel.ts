import { db } from "./index";
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export interface QuizModel extends Model<InferAttributes<QuizModel>, InferCreationAttributes<QuizModel>> {
  id: CreationOptional<number>;
  user_id: number;
  correct_count: number;
  wrong_count: number;
}

export const Quiz = db.define<QuizModel>('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, 
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  correct_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  wrong_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

(async () => {
  await Quiz.sync({force: true});
})();

