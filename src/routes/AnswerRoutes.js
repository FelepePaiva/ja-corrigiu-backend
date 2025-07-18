import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { idParamSchema } from "../validations/params.validation.js";
import { createAnswer, getAnswerByStudentId, removeAnswerById } from "../controllers/AnswerController.js";
import { answerSchema } from "../validations/answerSchema.validation.js";
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();

    router.post('/answer', validate(answerSchema), authenticateJWT, authorizeRole('student'), createAnswer);
    router.get('/answer/:id', validate(idParamSchema, 'params'), getAnswerByStudentId);
    router.delete('answer/:id', validate(idParamSchema, 'params'),
        authorizeRole(['teacher', 'admin']),
        removeAnswerById),
        authenticateJWT;
export default router;