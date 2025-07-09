import { createAnswerService, getAnswerByStudentIdService } from "../services/AnswerService.js"

export const createAnswer = async (req, res, next) => {

    try 
    {
        const answer = await createAnswerService(req.body);
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