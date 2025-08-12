import { createAnswerService, getAnswerByStudentIdService, removeAnswerByIdService } from "../services/AnswerService.js"

export const createAnswer = async (req, res, next) => {

    try 
    {
        const studentId = req.user.id;
        const {examId, answers} = req.body;
        const answer = await createAnswerService({studentId, examId, answers})
        res.status(201).json(answer);
    }
    catch(err)
    {
        next(err);
    }
}
export const  getAnswerByStudentId = async (req, res, next) => {
    const {id} = req.params;
    try 
    {
        const answers = await getAnswerByStudentIdService(id);
        res.status(200).json(answers);
    }
    catch (err)
    {
        next(err);
    }
}
export const removeAnswerById = async (req, res, next) => {
    const {id} = req.params;
    try 
    {
        const answer = await removeAnswerByIdService(id);
        res.status(204).send();
    }
    catch (err)
    {
        next(err);
    }
}
