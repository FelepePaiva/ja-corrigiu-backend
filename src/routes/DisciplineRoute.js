import { Router } from "express";
import { getAllDisciplines } from "../controllers/DisciplineController.js";

const router = Router();

router.get('/disciplines', getAllDisciplines);

export default router;