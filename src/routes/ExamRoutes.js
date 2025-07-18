import { Router } from "express";
import { examSchema } from "../validations/examSchema.validation.js";
import { createExam, getExamByFilters, removeExamById } from "../controllers/ExamController.js";
import { validate } from "../middleware/validate.middleware.js";
import {idParamSchema} from "../validations/params.validation.js";
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();

router.post('/exam', validate(examSchema),
    authenticateJWT, 
    authorizeRole(['teacher', 'admin']), 
    createExam);
router.get('/exam', authenticateJWT, getExamByFilters)
router.delete('/exam/:id', validate(idParamSchema, 'params'), 
    authenticateJWT, 
    authorizeRole(['teacher', 'admin']), 
    removeExamById);

export default router;