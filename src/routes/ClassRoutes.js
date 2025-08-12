import { Router } from "express";
import { getAllClasses, getStudentsByIdClass } from "../controllers/ClassController.js";
import { idParamSchema } from "../validations/params.validation.js";
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: "6BT"
 *           description: "Código da turma (formato: número entre 5-9, seguido de letra maiúscula e 'M' ou 'T')"
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
 *   - name: Class
 *     description: Endpoints para gerenciamento de turmas
 */

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Lista todas as turmas
 *     tags: [Class]
 *     responses:
 *       200:
 *         description: Lista de turmas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get('/class', getAllClasses);

/**
 * @swagger
 * /class/{id}/students:
 *   get:
 *     summary: Lista todos os alunos de uma turma específica
 *     tags: [Class]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: "ID da turma"
 *     responses:
 *       200:
 *         description: Lista de alunos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 5
 *                   name:
 *                     type: string
 *                     example: "João da Silva"
 *                   email:
 *                     type: string
 *                     example: "joao@email.com"
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Turma não encontrada
 */
router.get(
  '/class/:id/students',
  validate(idParamSchema, 'params'),
  authenticateJWT,
  getStudentsByIdClass
);

export default router;
