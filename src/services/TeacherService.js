import Teacher from "../models/teacher.model.js";
import {HttpError} from "../errors/HttpError.js";
import bcrypt from 'bcrypt';
import Discipline from "../models/discipline.model.js"
import Exam from "../models/exam.model.js";

export const createTeacherService = async(teacher) => {

    const {name, email, cpf, password, disciplineId} = teacher;

    const existingTeacher = await Teacher.findOne({where: {cpf}});

    if (existingTeacher)
    {
        throw new HttpError(409, "Já existe um professor com esse CPF")
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = await Teacher.create({
        name,
        email,
        cpf,
        password: hashedPassword,
    });
    if (disciplineId)
    {
        await newTeacher.addDiscipline(disciplineId);
    }
    const { password: _, ...safeTeacher } = newTeacher.toJSON();

    return safeTeacher;
}
export const getAllTeacherServices = async () => {
    const teachers = await Teacher.findAll({
        attributes: ['id', 'name', 'email'],
        include: {
            model: Discipline,
            as: 'disciplines',
            attributes: ['name'],
            through: {attributes: []}
        }
    });
    return teachers.map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        discipline: teacher.disciplines && teacher.disciplines.length > 0
        ? teacher.disciplines[0].name : null
    }));
}
export const removeTeacherByIdService = async(id) => {
  const teacher = await Teacher.findByPk(id);

  if (!teacher) {
    throw new HttpError(404, "Não foi encontrado nenhum professor com esse ID");
  }

  await Exam.destroy({ where: { teacherId: id } });

  await teacher.destroy();

  return true;
};

export const getTeacherByIdService = async (id) => {
    const existingTeacher = await Teacher.findByPk(id);
    if (!existingTeacher)
    {
        throw new HttpError(404, "Não foi encontrado nenhum professor com esse ID")
    }
    return existingTeacher;
}