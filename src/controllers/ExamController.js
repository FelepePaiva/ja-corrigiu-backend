import { createExamService } from "../services/ExamService.js"

export const createExam = async (req, res, next) => {
    try 
    {
        const exam = await createExamService(req.body);
        res.status(201).json(exam);
    }
    catch (err){next(err)}
}