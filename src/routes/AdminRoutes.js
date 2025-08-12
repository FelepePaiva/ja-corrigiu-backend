import { Router } from "express";
import { createAdmin, getAdminByEmail } from "../controllers/AdminController.js";
import { adminSchema } from "../validations/adminSchema.validation.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticateJWT } from "../middleware/authenticate.middleware.js";
import { authorizeRole } from "../middleware/authorizeRole.middleware.js";

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     AdminInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: Administrador
 *           description: O nome precisa ter três caracteres
 *         email:
 *           type: string
 *           format: email
 *           example: admin@example.com
 *           description: Email válido do administrador
 *         password:
 *           type: string
 *           minLength: 6
 *           example: senhaSegura123
 *           description: A senha precisa ter 6 caracteres, no mínimo
 *     Admin:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Administrador
 *         email:
 *           type: string
 *           format: email
 *           example: admin@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-07T18:25:43.511Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-08-07T18:25:43.511Z
 * 
 * tags:
 *   - name: Admin
 *     description: Endpoints para gerenciamento de administradores
 */

/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Cria um novo administrador
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Dados para criação do administrador
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminInput'
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão para executar esta ação
 */
router.post(
  '/admin',
  validate(adminSchema),
  authenticateJWT,
  authorizeRole('admin'),
  createAdmin
);

/**
 * @swagger
 * /admin/{email}:
 *   get:
 *     summary: Busca um administrador pelo email
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         required: true
 *         description: Email do administrador
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Administrador não encontrado
 */
router.get(
  '/admin/:email',
  authenticateJWT,
  authorizeRole('admin'),
  getAdminByEmail
);

export default router;
