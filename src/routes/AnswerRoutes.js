import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { idParamSchema } from "../validations/params.validation.js";
import { createAnswer, getAnswerByStudentId } from "../controllers/AnswerController.js";

const router = Router();

router.post('/answer', createAnswer);
router.get('/answer/:id', validate(idParamSchema, 'params'), getAnswerByStudentId);

export default router;