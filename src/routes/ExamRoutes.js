import { Router } from "express";
import { examSchema } from "../validations/examSchema.validation.js";
import { createExam, getExamByFilters } from "../controllers/ExamController.js";
import { validate } from "../middleware/validate.middleware.js";
import {idParamSchema} from "../validations/params.validation.js"

const router = Router();

router.post('/exam', validate(examSchema), createExam);
router.get('/exam', getExamByFilters)

export default router;