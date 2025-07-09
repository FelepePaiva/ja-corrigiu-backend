import Student from '../models/student.model.js';
import Class from '../models/class.model.js';

export const createStudentService = async (student) => {
    const {name, email, cpf, registration_code, classId} = student;

    const existingClass = await Class.findByPk(classId);
    if(!existingClass)
    {
        throw new Error("Não foi encontrada nenhuma classe com esse ID");
    }

    const existingStudent = await Student.findOne({where: {cpf}});

    if (existingStudent)
    {
        throw new Error("O estudante já está cadastrado")
    }
    const newStudent = await Student.create({name, email, cpf, registration_code, classId});
    return newStudent;
}
export const removeStudentService = async (id) => {
    const existingStudent = await Student.findByPk(id);

    if (!existingStudent)
    {
        throw new Error("O estudante com esse ID não foi encontrado")
    }
    await existingStudent.destroy();
    return true;
}