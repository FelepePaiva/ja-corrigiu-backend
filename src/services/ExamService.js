import { includes } from 'zod/v4';
import { HttpError } from '../errors/HttpError.js';
import Exam from '../models/exam.model.js'

export const createExamService = async ({title, questions_count, answer_key,
     teacherId, classId}) => {

    if (questions_count !== answer_key.length)
    {
        throw new HttpError(400, "O número de questões e o número de resposta estão diferentes");
    }
    const newExam = await Exam.create({title, questions_count, answer_key, teacherId, classId});
    return newExam; 
}
export const getExamsByFilterService = async (filters) => {
    const where = {};
    const include = [];
        if (filters.teacherId) 
        {
        where.teacherId = filters.teacherId;
        }
        if (filters.disciplineId) 
        {
        where.disciplineId = filters.disciplineId;
        }
        if (filters.className) {
        where.class = filters.className;
        }
        if (filters.classCode) {
            include.push({
                model: Class,
                where: {code: filters.classCode},
                required: true
            })
        }
        const exams = await Exam.findAll({
            where,
            include,
        });
        return exams
}
export const removeExamByIdService = async (id) => {
    
    const exam = await Exam.findByPk(id);
    if (!exam)
        {
            throw new HttpError(404, "Não foi encontrado nenhum exame com esse ID")
        } 
    await exam.destroy();
    return true;
}
