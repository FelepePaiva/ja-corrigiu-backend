import { getAllClassesService, getStudentsByIdClassService } from "../services/ClassService.js"

export const getAllClasses = async (req, res, next) => {
    try
    {
        const classes = await getAllClassesService();
        res.status(200).json(classes);
    }
    catch (err)
    {
        next(err);
    }
}
export const getStudentsByIdClass = async (req, res, next) => {
    const id = req.params.id
    try
    {
        const results = await getStudentsByIdClassService(id);
        res.status(200).json(results);
    }
    catch (err)
    {
        next(err);
    }
}