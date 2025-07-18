import { getAllDisciplinesService } from "../services/DisciplineService.js"

export const getAllDisciplines = async (req, res, next) => {
    try
    {
        const disciplines = await getAllDisciplinesService();
        res.status(200).json(disciplines)
    }
    catch (err)
    {
        next(err)
    }
}