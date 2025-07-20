import { createStudentService, getAllAnswersByStudentIdService, getStudentByIdService, getStudentsByClassService, removeStudentService } from "../services/StudentService.js";

export const createStudent = async (req, res, next) => {
    console.log("[BACKEND] Requisição recebida:", req.body);
    console.log("Tipo de classId:", typeof req.body.classId);
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
export const getStudentsByClass = async (req, res, next) => {
    const {code} = req.params;
    try
    {
        const students = await getStudentsByClassService(code);
        res.status(200).json(students);
    }
    catch (err)
    {
        next(err);
    }
}