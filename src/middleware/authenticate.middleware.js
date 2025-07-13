import  jwt  from 'jsonwebtoken';
import {HttpError} from '../errors/HttpError.js';

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) 
    {
        return next(new HttpError(401, "Token de autenticação ausente ou inválido"))
    }
    const token = authHeader.split(' ')[1];
    try 
    {
        const decoded = jwt.verify(token, process.env.JTW_SECRET || 'a15ef6b9fd82d45d0a3f89508c0081b23fcd522a15d3141281a07ff9b97165b3b2b2b201ebd77a67ea6308e7f0eba6af5559a7ceec2b8d32f22e9de55f9c3bfa');
        req.user = decoded;
        next();
    }
    catch (err)
    {
        next(new HttpError(401, "Token inválido ou expirado"));
    }
};