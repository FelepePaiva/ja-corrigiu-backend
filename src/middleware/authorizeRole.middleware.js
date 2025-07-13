import { HttpError } from "../errors/HttpError.js";

export const authorizeRole = (role) => {
    return (req, res, next) => 
        {
        if(!req.user || req.user.role !== role)
        {
            return next(new HttpError(403, 'Acesso não autorizado'))
        }
        next();
        };
};