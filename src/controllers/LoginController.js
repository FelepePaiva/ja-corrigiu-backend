import { loginCenterService } from "../services/LoginService.js";

export const loginCenter = async (req, res, next) => {
    try
    {
        const {token, user} = await loginCenterService(req.body);
        res.status(200).json({token, user});
    }
    catch(err)
    {
        next(err);
    }
}