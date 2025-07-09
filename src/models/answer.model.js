import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Student from './student.model.js';
import Exam from './exam.model.js';

const Answer = sequelize.define('Answer', {
  answers: {
    type: DataTypes.JSON, // Array das respostas do aluno, ex: ["A", "D", "C", ...]
    allowNull: false,
  },
  score: {
    type: DataTypes.FLOAT, // Número de acertos
    allowNull: false,
  },
  percentage: {
    type: DataTypes.FLOAT, // Percentual de acertos
    allowNull: false,
  },
}, {
  tableName: 'answers',
  timestamps: true,
});

// Definindo relacionamentos
Student.hasMany(Answer, { foreignKey: 'studentId' });
Answer.belongsTo(Student, { foreignKey: 'studentId' });

Exam.hasMany(Answer, { foreignKey: 'examId' });
Answer.belongsTo(Exam, { foreignKey: 'examId' });

export default Answer;
