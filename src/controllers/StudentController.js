import { createStudentService, removeStudentService } from "../services/StudentService.js";

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