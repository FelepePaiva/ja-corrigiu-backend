import { createExamService, getExamsByFilterService } from "../services/ExamService.js"

export const createExam = async (req, res, next) => {
    try 
    {
        const exam = await createExamService(req.body);
        res.status(201).json(exam);
    }
    catch (err){next(err)}
}
export const getExamByFilters = async (req, res, next) => {
    try 
    {
        const exams = await getExamsByFilterService(req.query)
        res.status(200).json(exams);
    }
    catch (err)
    {
        next(err)
    }
}