import { Router } from "express";
import {validate} from '../middleware/validate.middleware.js';
import { teacherSchema } from "../validations/teacherSchema.validation.js";
import {authenticateJWT} from "../middleware/authenticate.middleware.js";
import {authorizeRole} from "../middleware/authorizeRole.middleware.js";
import { createTeacher, getAllTeacher, getTeacherById, removeTeacherById } from "../controllers/TeacherController.js";
import {idParamSchema} from "../validations/params.validation.js";

const router = Router();

router.post('/teacher', validate(teacherSchema), authenticateJWT, authorizeRole('admin'), createTeacher);
router.get('/teacher', getAllTeacher);
router.delete('/teacher/:id', validate(idParamSchema, 'params'), authenticateJWT, authorizeRole('admin'), removeTeacherById);
router.get('/teacher/:id', validate(idParamSchema, 'params'), getTeacherById);

export default router;