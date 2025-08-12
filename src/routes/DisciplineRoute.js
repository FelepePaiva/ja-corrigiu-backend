import { Router } from "express";
import { getAllDisciplines } from "../controllers/DisciplineController.js";

/**
 * @swagger
 * tags:
 *   name: Disciplines
 *   description: Endpoints para gerenciamento de disciplinas
 */

/**
 * @swagger
 * /disciplines:
 *   get:
 *     summary: Lista todas as disciplinas
 *     tags: [Disciplines]
 *     responses:
 *       200:
 *         description: Lista de disciplinas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Matemática
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-08-08T20:15:30.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-08-08T20:15:30.000Z
 *       500:
 *         description: Erro interno do servidor
 */

const router = Router();

router.get('/disciplines', getAllDisciplines);

export default router;
