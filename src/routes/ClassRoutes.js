import { Router } from "express";
import { getAllClasses } from "../controllers/ClassController.js";
import {idParamSchema} from "../validations/params.validation.js";
import {authenticateJWT} from "../middleware/authenticate.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { getStudentsByIdClass } from "../controllers/ClassController.js"

const router = Router();

router.get('/class', getAllClasses);
router.get('/class/:id/students', validate(idParamSchema, 'params'), authenticateJWT, getStudentsByIdClass)

export default router;