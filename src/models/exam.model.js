import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Exam = sequelize.define('Exam', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questions_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answer_key: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  bimester: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4,
    },
  }
}, {
  tableName: 'exams',
  timestamps: true,
});

export default Exam;
