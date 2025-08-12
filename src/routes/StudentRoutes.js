import { Router } from "express";
import { createStudent, getAllAnswersByStudentId, getAvailableExamsForStudent, getStudentsByClass, removeStudent } from "../controllers/StudentController.js";
import { validate } from "../middleware/validate.middleware.js";
import { studentSchema } from "../validations/student.validation.js";
import { idParamSchema } from "../validations/params.validation.js";
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "João da Silva"
 *         email:
 *           type: string
 *           format: email
 *           example: "joao@email.com"
 *         cpf:
 *           type: string
 *           example: "12345678901"
 *         registration_code:
 *           type: string
 *           example: "2025001"
 *         classId:
 *           type: integer
 *           example: 1
 *           description: "ID da turma associada ao aluno"
 *     IdParam:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: "ID positivo para busca"
 *     CodeParam:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: "6BT"
 *           description: "Código da turma (exemplo: 6BT)"
 */

/**
 * @swagger
 * tags:
 *   - name: Student
 *     description: Endpoints para gerenciamento de alunos
 */

/**
 * @swagger
 * /student:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados para criação do aluno
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 */
router.post(
  '/student',
  validate(studentSchema, 'body'),
  authenticateJWT,
  authorizeRole('teacher', 'admin'),
  createStudent
);

/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     summary: Remove um aluno pelo ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: "ID do aluno"
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Aluno não encontrado
 */
router.delete(
  '/student/:id',
  validate(idParamSchema, 'params'),
  authenticateJWT,
  removeStudent
);

/**
 * @swagger
 * /student/{id}/answers:
 *   get:
 *     summary: Lista todas as respostas de um aluno
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: "ID do aluno"
 *     responses:
 *       200:
 *         description: Lista de respostas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   examId:
 *                     type: integer
 *                     example: 1
 *                   answers:
 *                     type: array
 *                     items:
 *                       type: string
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Aluno não encontrado
 */
router.get(
  '/student/:id/answers',
  validate(idParamSchema, 'params'),
  authenticateJWT,
  getAllAnswersByStudentId
);

/**
 * @swagger
 * /student/{code}/class:
 *   get:
 *     summary: Busca alunos por código da turma
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/CodeParam'
 *         description: "Código da turma (exemplo: 6BT)"
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
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Turma não encontrada
 */
router.get(
  '/student/:code/class',
  authenticateJWT,
  getStudentsByClass
);

/**
 * @swagger
 * /student/{id}/available-exams:
 *   get:
 *     summary: Lista provas disponíveis para um aluno
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/IdParam'
 *         description: "ID do aluno"
 *     responses:
 *       200:
 *         description: Lista de provas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   examId:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Prova 1"
 *                   bimester:
 *                     type: integer
 *                     example: 1
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Aluno não encontrado
 */
router.get(
  '/student/:id/available-exams',
  validate(idParamSchema, 'params'),
  authorizeRole('student'),
  authenticateJWT,
  getAvailableExamsForStudent
);

export default router;
