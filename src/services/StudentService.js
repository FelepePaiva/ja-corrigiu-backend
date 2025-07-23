import Student from '../models/student.model.js';
import Class from '../models/class.model.js';
import Answer from '../models/answer.model.js'
import {HttpError} from '../errors/HttpError.js'
import Exam from '../models/exam.model.js';

export const createStudentService = async (student) => {
    const {name, email, cpf, registration_code, classId} = student;

    const existingClass = await Class.findByPk(classId);
    if(!existingClass)
    {
        throw new Error("Não foi encontrada nenhuma classe com esse ID");
    }

    const existingStudent = await Student.findOne({where: {cpf}});

    if (existingStudent)
    {
        throw new Error("O estudante já está cadastrado")
    }
    const newStudent = await Student.create({name, email, cpf, registration_code, classId});
    return newStudent;
}
export const removeStudentService = async (id) => {
    const existingStudent = await Student.findByPk(id);

    if (!existingStudent)
    {
        throw new Error("O estudante com esse ID não foi encontrado")
    }
    await existingStudent.destroy();
    return true;
}
export const getStudentByIdService = async (id) => {
    const student = await Student.findByPk(id);

    if (!student)
    {
        throw new HttpError(404, "Nenhum estudante com esse ID foi encontrado");
    }
    return student;
}
export const getAllAnswersByStudentIdService = async (id) => {
    const student = await Student.findByPk(id)
    if (!student)
    {
        throw new HttpError(404, "Não foi encontrado nenhum estudante com esse ID")
    }
    const answers = await Answer.findAll({
        where: { studentId: id },
        include: [
            {
                model: Exam,
                as: 'exam',
                attributes: ['id', 'title', 'questions_count']
            }
        ],
        attributes: ['id', 'score', 'percentage', 'answers', 'examId']
    });
    if (!answers || answers.length === 0)
    {
        throw new HttpError(404, "Não foi encontrado provas com esse ID do estudante")
    }
    return answers;
}
export const getStudentsByClassService = async (code) => {
    const studentsByClass = await Class.findOne({
        where: {code},
         include: [
      {
        model: Student,
        as: 'students'
      }
    ]
    })
    if (!studentsByClass || studentsByClass.students.length === 0)
    {
        throw new HttpError(404, "Não foram encontrados estudantes nessa classe")
    }
    return studentsByClass

}