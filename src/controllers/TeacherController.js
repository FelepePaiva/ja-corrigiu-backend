import { createTeacherService, getAllTeacherServices, getTeacherByIdClassService, getTeacherByIdService, removeTeacherByIdService } from "../services/TeacherService.js";

export const createTeacher = async (req, res, next) => {

    const teacher = req.body;
    try 
    {
        const newTeacher = await createTeacherService(teacher);
        res.status(201).json(newTeacher);
    }
    catch (err)
    {
        next(err);
    }
}
export const getAllTeacher = async (req, res, next) => {
    try 
    {
        const teachers = await getAllTeacherServices();
        res.status(200).json(teachers);
    }
    catch (err)
    {
        next(err);
    }
}
export const removeTeacherById = async (req, res, next) => {
    const {id} = req.params;
    try
    {
        const teacher = await removeTeacherByIdService(id);
        res.status(204).send();
    }
    catch (err)
    {
        next(err);
    }
}
export const getTeacherById = async (req, res, next) => {
    const {id} = req.params;
    try
    {
        const teacher = await getTeacherByIdService(id);
        res.status(200).json(teacher);
    }
    catch(err)
    {
        next(err)
    }
}
export const getTeacherByIdClass = async (req, res, next) => {
    const {id} = req.params;
    try
    {
        const teacherClasses = await getTeacherByIdClassService(id);
        res.status(200).json(teacherClasses);
    }
    catch (err)
    {
        next(err);
    }
}