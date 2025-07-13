import { Router } from "express";
import { createStudent, getAllAnswersByStudentId, getStudentsByClass, removeStudent } from "../controllers/StudentController.js";
import { validate } from "../middleware/validate.middleware.js";
import { studentSchema } from "../validations/student.validation.js";
import { idParamSchema } from "../validations/params.validation.js";

const router = Router();

router.post('/student', validate(studentSchema, 'body'), createStudent);
router.delete('/student/:id', validate(idParamSchema, 'params'), removeStudent);
router.get('/student/:id/answers', validate(idParamSchema, 'params'), getAllAnswersByStudentId);
router.get('/student/:code/class', getStudentsByClass);

export default router;