import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { loginUserValidationRules, registerUserValidationRules, validate } from '../validations/validationRules.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username
 *         password:
 *           type: string
 *           description: The password
 *       example:
 *         username: admin
 *         password: Pass@word1
 *     Register:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username
 *         email:
 *           type: string
 *           description: The email
 *         password:
 *           type: string
 *           description: The password
 *       example:
 *         username: admin
 *         email: admin@gmail.com
 *         password: Pass@word1
 */
/**
 * @swagger
 * tags:
 *   name: Authentications
 *   description: The Authentications managing API
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login to the system
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Login'  
 *     responses:
 *       200:
 *         description: The login was successfully
 *       401:
 *         description: Authentication failed.
 */
router.post('/login', loginUserValidationRules(), validate, login);
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/register', registerUserValidationRules(), validate, register);

export default router;