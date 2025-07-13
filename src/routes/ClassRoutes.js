import { Router } from "express";
import { getAllClasses } from "../controllers/ClassController.js";

const router = Router();

router.get('/class', getAllClasses);

export default router;