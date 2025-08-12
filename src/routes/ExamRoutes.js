import { Router } from "express";
import { examSchema } from "../validations/examSchema.validation.js";
import { createExam, getExamByFilters, removeExamById } from "../controllers/ExamController.js";
import { validate } from "../middleware/validate.middleware.js";
import { idParamSchema } from "../validations/params.validation.js";
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Exam:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Prova de Matemática"
 *           description: "Título da prova"
 *         questions_count:
 *           type: integer
 *           example: 10
 *           description: "Quantidade de questões"
 *         answer_key:
 *           type: array
 *           items:
 *             type: string
 *           example: ["A", "B", "C", "D", "A"]
 *           description: "Gabarito das questões"
 *         teacherId:
 *           type: integer
 *           example: 3
 *           description: "ID do professor criador"
 *         classId:
 *           type: integer
 *           example: 2
 *           description: "ID da turma associada"
 *         bimester:
 *           type: integer
 *           example: 1
 *           minimum: 1
 *           maximum: 4
 *           description: "Bimestre da prova (1 a 4)"
 *     IdParam:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: "ID positivo para busca"
 */

/**
 * @swagger
 * tags:
 *   - name: Exam
 *     description: "Endpoints para gerenciamento de provas"
 */

/**
 * @swagger
 * /exam:
 *   post:
 *     summary: "Cria uma nova prova"
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exam'
 *     responses:
 *       201:
 *         description: "Prova criada com sucesso"
 *       400:
 *         description: "Dados inválidos"
 *       401:
 *         description: "Não autenticado"
 *       403:
 *         description: "Sem permissão"
 */
router.post(
  '/exam',
  validate(examSchema),
  authenticateJWT,
  authorizeRole(['teacher', 'admin']),
  createExam
);

/**
 * @swagger
 * /exam:
 *   get:
 *     summary: "Lista provas aplicando filtros opcionais"
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: teacherId
 *         schema:
 *           type: integer
 *         description: "Filtrar por ID do professor"
 *       - in: query
 *         name: classId
 *         schema:
 *           type: integer
 *         description: "Filtrar por ID da turma"
 *       - in: query
 *         name: bimester
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 4
 *         description: "Filtrar por bimestre"
 *     responses:
 *       200:
 *         description: "Lista de provas retornada com sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exam'
 *       401:
 *         description: "Não autenticado"
 */
router.get('/exam', authenticateJWT, getExamByFilters);

/**
 * @swagger
 * /exam/{id}:
 *   delete:
 *     summary: "Remove uma prova pelo ID"
 *     tags: [Exam]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: "ID da prova"
 *     responses:
 *       200:
 *         description: "Prova removida com sucesso"
 *       400:
 *         description: "ID inválido"
 *       401:
 *         description: "Não autenticado"
 *       403:
 *         description: "Sem permissão"
 *       404:
 *         description: "Prova não encontrada"
 */
router.delete(
  '/exam/:id',
  validate(idParamSchema, 'params'),
  authenticateJWT,
  authorizeRole(['teacher', 'admin']),
  removeExamById
);

export default router;
