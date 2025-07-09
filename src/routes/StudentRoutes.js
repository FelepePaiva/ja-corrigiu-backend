import { Router } from "express";
import { createStudent, removeStudent } from "../controllers/StudentController.js";
import { validate } from "../middleware/validate.middleware.js";
import { studentSchema } from "../validations/student.validation.js";
import { idParamSchema } from "../validations/params.validation.js";

const router = Router();

router.post('/student', validate(studentSchema, 'body'), createStudent);
router.delete('/student/:id', validate(idParamSchema, 'params'), removeStudent);

export default router;