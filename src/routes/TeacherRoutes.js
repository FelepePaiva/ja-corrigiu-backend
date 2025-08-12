import { Router } from "express";
import { validate } from '../middleware/validate.middleware.js';
import { teacherSchema } from "../validations/teacherSchema.validation.js";
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";
import {
  createTeacher,
  getAllTeacher,
  getTeacherById,
  getTeacherByIdClass,
  removeTeacherById,
} from "../controllers/TeacherController.js";
import { idParamSchema } from "../validations/params.validation.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Maria Souza"
 *           description: "Nome completo do professor"
 *         email:
 *           type: string
 *           format: email
 *           example: "maria@email.com"
 *           description: "Email do professor"
 *         cpf:
 *           type: string
 *           example: "12345678901"
 *           description: "CPF do professor"
 *         password:
 *           type: string
 *           example: "senha123"
 *           description: "Senha do professor (mínimo 6 caracteres)"
 *         disciplineId:
 *           type: integer
 *           example: 2
 *           description: "ID da disciplina associada"
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
 *   - name: Teacher
 *     description: Endpoints para gerenciamento de professores
 */

/**
 * @swagger
 * /teacher:
 *   post:
 *     summary: Cria um novo professor
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados para criação do professor
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão para executar esta ação
 */
router.post(
  '/teacher',
  validate(teacherSchema),
  authenticateJWT,
  authorizeRole('admin'),
  createTeacher
);

/**
 * @swagger
 * /teacher:
 *   get:
 *     summary: Lista todos os professores
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: Lista de professores retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */
router.get('/teacher', getAllTeacher);

/**
 * @swagger
 * /teacher/{id}:
 *   get:
 *     summary: Busca professor pelo ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Professor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Professor não encontrado
 */
router.get(
  '/teacher/:id',
  validate(idParamSchema, 'params'),
  getTeacherById
);

/**
 * @swagger
 * /teacher/{id}/class:
 *   get:
 *     summary: Busca as turmas associadas ao professor
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: ID do professor
 *     responses:
 *       200:
 *         description: Lista de turmas do professor
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
 *                   code:
 *                     type: string
 *                     example: "6BT"
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Professor não encontrado
 */
router.get(
  '/teacher/:id/class',
  validate(idParamSchema, 'params'),
  authenticateJWT,
  getTeacherByIdClass
);

/**
 * @swagger
 * /teacher/{id}:
 *   delete:
 *     summary: Remove um professor pelo ID
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: ID do professor
 *     responses:
 *       204:
 *         description: Professor removido com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão para executar esta ação
 *       404:
 *         description: Professor não encontrado
 */
router.delete(
  '/teacher/:id',
  validate(idParamSchema, 'params'),
  authenticateJWT,
  authorizeRole('admin'),
  removeTeacherById
);

export default router;
