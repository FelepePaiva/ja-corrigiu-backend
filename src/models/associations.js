import Student from "./student.model.js";
import Teacher from "./teacher.model.js";
import Discipline from "./discipline.model.js";
import Class from "./class.model.js";
import Exam from "./exam.model.js";
import Answer from "./answer.model.js";

Student.belongsTo(Class, { foreignKey: 'classId', as: 'class' });
Class.hasMany(Student, { foreignKey: 'classId', as: 'students' });



Teacher.belongsToMany(Class, {
  through: 'teacher_classes',
  foreignKey: 'teacherId',
  otherKey: 'classId',
  as: 'classes'
});
Class.belongsToMany(Teacher, {
  through: 'teacher_classes',
  foreignKey: 'classId',
  otherKey: 'teacherId',
  as: 'teachers'
});

Teacher.belongsToMany(Discipline, {
  through: 'teacher_disciplines',
  foreignKey: 'teacherId',
  otherKey: 'disciplineId',
  as: 'disciplines'
});
Discipline.belongsToMany(Teacher, {
  through: 'teacher_disciplines',
  foreignKey: 'disciplineId',
  otherKey: 'teacherId',
  as: 'teachers'
});

// Esse trecho aqui é para o MVP
Student.hasMany(Answer, { foreignKey: 'studentId', as: 'answers' });
Answer.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

Exam.hasMany(Answer, { foreignKey: 'examId', as: 'answers' });
Answer.belongsTo(Exam, { foreignKey: 'examId', as: 'exam' });

