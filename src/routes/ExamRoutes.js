import { Router } from "express";
import { examSchema } from "../validations/examSchema.validation.js";
import { createExam } from "../controllers/ExamController.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

router.post('/exam', validate(examSchema), createExam);

export default router;