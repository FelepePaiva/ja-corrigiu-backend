import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { loginCenter } from "../controllers/LoginController.js";
import { loginSchema } from "../validations/loginSchema.validation.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *           description: Email válido do usuário
 *         password:
 *           type: string
 *           minLength: 6
 *           example: senhaSegura123
 *           description: Senha do usuário
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token JWT para autenticação
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints para autenticação
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login para obter token JWT
 *     tags: [Auth]
 *     requestBody:
 *       description: Dados para login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validate(loginSchema), loginCenter);

export default router;
