import { Router } from "express";
import { createStudent, getAllAnswersByStudentId, getStudentsByClass, removeStudent } from "../controllers/StudentController.js";
import { validate } from "../middleware/validate.middleware.js";
import { studentSchema } from "../validations/student.validation.js";
import { idParamSchema } from "../validations/params.validation.js";
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();

router.post('/student', validate(studentSchema, 'body'),
    authenticateJWT, 
    authorizeRole(['teacher', 'admin']), 
    createStudent);
router.delete('/student/:id', validate(idParamSchema, 'params'), authenticateJWT,  removeStudent);
router.get('/student/:id/answers', validate(idParamSchema, 'params'), authenticateJWT, getAllAnswersByStudentId);
router.get('/student/:code/class', authenticateJWT, getStudentsByClass);

export default router;