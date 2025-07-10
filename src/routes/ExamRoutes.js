import { Router } from "express";
import { examSchema } from "../validations/examSchema.validation.js";
import { createExam, getExamByFilters, removeExamById } from "../controllers/ExamController.js";
import { validate } from "../middleware/validate.middleware.js";
import {idParamSchema} from "../validations/params.validation.js"

const router = Router();

router.post('/exam', validate(examSchema), createExam);
router.get('/exam', getExamByFilters)
router.delete('/exam/:id', validate(idParamSchema, 'params'), removeExamById);

export default router;