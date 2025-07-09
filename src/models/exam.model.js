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
    type: DataTypes.JSON, // Armazena o gabarito como array, ex: ["A", "B", "C", ...]
    allowNull: false,
  },
}, {
  tableName: 'exams',
  timestamps: true,
});

export default Exam;
