import { HttpError } from "../errors/HttpError.js";
import Class from "../models/class.model.js";
import Student from "../models/student.model.js"

export const getAllClassesService = async () => {
    const classes = await Class.findAll();
    return classes;
}
export const getStudentsByIdClassService = async (id) => {
    const result = await Class.findByPk(id, {
        include: {
        model: Student,
        as: "students",
        }
    });
    if (!result)
    {
        throw new HttpError(404, "Não foi encontrado nenhum dado")
    }
    return result.students;
}
