import { HttpError } from "../errors/HttpError.js";
import Answer from "../models/answer.model.js";
import Exam from "../models/exam.model.js";
import Student from "../models/student.model.js";

export const createAnswerService = async ({studentId, examId, answers}) => {

    const exam = await Exam.findByPk(examId);
    console.log("exame:", exam)
    if (!exam)
    {
        throw new HttpError(404, "A prova com esse ID não foi encontrada")
    }
    const correctAnswers = exam.answer_key;
    if (answers.length !== correctAnswers.length)
    {
        throw new HttpError(400, "Número de respostas não corresponde ao número de questões da prova");
    }
    let score = 0;
    for (let i = 0; i <answers.length; i++)
    {
        if(answers[i] === correctAnswers[i]) score++;
    }
    const percentage = (score / correctAnswers.length) * 100;
    const answer = await Answer.create({
        answers,
        score,
        percentage,
        studentId,
        examId
    });
    return answer;
}
export const getAnswerByStudentIdService = async (id) => {
    const student = await Student.findByPk(id);

    if(!student)
    {
        throw new HttpError(404, "Estudante não encontrado");
    }
    const studentAnswers = await Answer.findAll({
    where: {studentId: student.id}, attributes: ['answers', 'score', 'percentage'],
    include: [{model: Exam, attributes: ['title']},
{             model: Student, attributes: ['name']}],
    });
    return studentAnswers;
}
export const removeAnswerByIdService = async (id) => {
    const answer = await Answer.findByPk(id);
    if (!answer)
    {
        throw new HttpError(404, "Não foi encontrado nenhum cartão-resposta com esse ID");
    }
    await answer.destroy();
    return true;
}