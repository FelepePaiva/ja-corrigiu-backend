import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { idParamSchema } from "../validations/params.validation.js";
import { createAnswer, getAnswerByStudentId, removeAnswerById } from "../controllers/AnswerController.js";
import { answerSchema } from "../validations/answerSchema.validation.js";
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AnswerInput:
 *       type: object
 *       required:
 *         - examId
 *         - answers
 *       properties:
 *         examId:
 *           type: integer
 *           example: 1
 *           description: ID da prova a ser respondida (positivo e inteiro)
 *         answers:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Resposta 1", "Resposta 2"]
 *           description: Lista de respostas do estudante
 *     Answer:
 *       allOf:
 *         - $ref: '#/components/schemas/AnswerInput'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 10
 *               description: ID único da resposta
 *             studentId:
 *               type: integer
 *               example: 5
 *               description: ID do estudante que enviou
 *     IdParam:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *           description: ID positivo para busca ou exclusão
 */

/**
 * @swagger
 * tags:
 *   - name: Answer
 *     description: Endpoints para respostas de provas
 */

/**
 * @swagger
 * /answer:
 *   post:
 *     summary: Cria uma nova resposta de prova
 *     tags: [Answer]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados da resposta
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerInput'
 *     responses:
 *       201:
 *         description: Resposta criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */
router.post(
  '/answer',
  validate(answerSchema),
  authenticateJWT,
  authorizeRole('student'),
  createAnswer
);

/**
 * @swagger
 * /answer/{id}:
 *   get:
 *     summary: Obtém resposta de prova por ID do estudante
 *     tags: [Answer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: ID do estudante
 *     responses:
 *       200:
 *         description: Resposta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Resposta não encontrada
 */
router.get(
  '/answer/:id',
  validate(idParamSchema, 'params'),
  getAnswerByStudentId
);

/**
 * @swagger
 * /answer/{id}:
 *   delete:
 *     summary: Remove uma resposta pelo ID
 *     tags: [Answer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: ID da resposta
 *     responses:
 *       200:
 *         description: Resposta removida com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Resposta não encontrada
 */
router.delete(
  '/answer/:id',
  validate(idParamSchema, 'params'),
  authenticateJWT,
  authorizeRole(['teacher', 'admin']),
  removeAnswerById
);

export default router;
