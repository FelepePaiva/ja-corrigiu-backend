import { getAllClassesService } from "../services/ClassService.js"

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