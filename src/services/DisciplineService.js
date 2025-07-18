import Discipline from "../models/discipline.model.js";    
export const getAllDisciplinesService = async () => {
    const disciplines = await Discipline.findAll();
    return disciplines;
}