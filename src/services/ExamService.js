import { HttpError } from '../errors/HttpError.js';
import Exam from '../models/exam.model.js'

export const createExamService = async ({title, questions_count, answer_key}) => {

    if (questions_count !== answer_key.length)
    {
        throw new HttpError(400, "O número de questões e o número de resposta estão diferentes");
    }
    const newExam = await Exam.create({title, questions_count, answer_key});
    return newExam; 
}