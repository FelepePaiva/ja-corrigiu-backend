import { HttpError } from "../errors/HttpError.js";
import Admin from "../models/admin.model.js";
import bcrypt from 'bcrypt';

export const createAdminService = async ({name, email, password}) => {

    const existingAdmin = await Admin.findOne({where: {email}});

    if(existingAdmin)
    {
        throw new HttpError(400, "Já existe um admin com esse email")
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
        name, email, password: hashedPassword,
    });
    return admin
}
export const getAdminByEmailService = async (email) => {
    const admin = await Admin.findOne({where: {email}});

    if (!admin)
    {
        throw new HttpError(404, "Nao foi encontrado nenhum admin com esse email")
    }
    return admin;
}
