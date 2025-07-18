import { HttpError } from "../errors/HttpError.js";
import Admin from "../models/admin.model.js";
import Teacher from "../models/teacher.model.js"
import Student from "../models/student.model.js";
import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";

export const loginCenterService = async ({email, password}) => {
    let user = null;
    let role = null;

    user = await Admin.findOne({where: {email}});
    if (user) role = 'admin';

    if (!user) 
    {
        user = await Teacher.findOne({where: {email}});
        if (user) role = 'teacher';
    }
    if (!user)
    {
        user = await Student.findOne({where: {email}});
        if (user) role = 'student';
    }
    if (!user)
    {
        throw new HttpError(401, "Credenciais inválidas");
    }
    const studentPassword =
    role === 'student'
      ? password === user.cpf
      : await bcrypt.compare(password, user.password);
    if (!studentPassword)
    {
        throw new HttpError(401, "Credenciais inválidas");
    }
    const token = jwt.sign(
    { id: user.id, role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
    );

    return {
        token,
        user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
        }
    }
}
