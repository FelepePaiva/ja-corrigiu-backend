import { Router } from "express";
import { createAdmin, getAdminByEmail } from "../controllers/AdminController.js";
import { adminSchema } from "../validations/adminSchema.validation.js";
import {validate} from '../middleware/validate.middleware.js';
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();

router.post('/admin', validate(adminSchema),authenticateJWT, authorizeRole('admim'), 
createAdmin);
router.get('/admin/:email', authenticateJWT, authorizeRole('admim'), getAdminByEmail);

export default router;