import { HttpError } from "../errors/HttpError.js";

export const authorizeRole = (...roles) => {
    
    return (req, res, next) => 
        {
            console.log("Usuário autenticado:", req.user);
        if(!req.user || !roles.includes(req.user.role))
        {
            return next(new HttpError(403, 'Acesso não autorizado'))
            
        }
        
        next();
        };
};