import { loginCenterService } from "../services/LoginService.js";

export const loginCenter = async (req, res, next) => {
    const {email, password} = req.body;
    try
    {
        const {token, role} = await loginCenterService({email, password});
        res.status(200).json({token, role});
    }
    catch(err)
    {
        next(err);
    }
}