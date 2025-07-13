import Class from "../models/class.model.js";

export const getAllClassesService = async () => {
    const classes = await Class.findAll();
    return classes;
}