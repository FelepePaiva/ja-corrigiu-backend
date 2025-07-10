import { createExamService, getExamsByFilterService, removeExamByIdService } from "../services/ExamService.js"

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
export const removeExamById = async (req, res, next) => {
    try 
    {
        const {id} = req.params;
        const exam = await removeExamByIdService(id);
        res.status(204).send();
    }
    catch (err)
    {
        next(err);
    }
}