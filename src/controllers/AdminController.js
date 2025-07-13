import { createAdminService, getAdminByEmailService } from "../services/AdminService.js";

export const createAdmin = async (req, res, next) => {
    const admin = req.body;
    try
    {
        const newAdmin = await createAdminService(admin);
        res.status(201).json(newAdmin);
    }
    catch (err)
    {
        next(err);
    }
}
export const getAdminByEmail = async (req, res, next) => {
    const {email} = req.params;
    try
    {
        const admin = await getAdminByEmailService(email);
        res.status(200).json(admin);
    }
    catch (err)
    {
        next(err);
    }
}