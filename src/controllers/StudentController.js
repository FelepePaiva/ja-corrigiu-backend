import { createStudentService, getAllAnswersByStudentIdService, getStudentByIdService, removeStudentService } from "../services/StudentService.js";

export const createStudent = async (req, res, next) => {
    try {
        const student = await createStudentService(req.body);        
        res.status(201).json(student);
    }
    catch (error) {next(error)}
};
export const removeStudent = async (req, res, next) => {

    try{
        await removeStudentService(req.params.id);
        res.status(204).send();
    }
    catch (error) {next(error)}
}
export const getStudentById = async (req, res, next) => {
    const {id} = req.params;
    try
    {
        const student = await getStudentByIdService(id);
        res.status(200).json(student);
    }
    catch(err)
    {
        next(err);
    }
}
export const getAllAnswersByStudentId = async (req, res, next) => {
    const {id} = req.params;
    try 
    {
        const answer = await getAllAnswersByStudentIdService(id);
        res.status(200).json(answer);
    }
    catch (err)
    {
        next(err);
    }
}