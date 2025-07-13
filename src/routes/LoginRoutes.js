import { Router } from "express";
import {validate} from "../middleware/validate.middleware.js";
import { loginCenter } from "../controllers/LoginController.js";
import {loginSchema} from "../validations/loginSchema.validation.js"

const router = Router();

router.post('/login', validate(loginSchema), loginCenter);

export default router;