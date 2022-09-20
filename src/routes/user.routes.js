import express from 'express';
import { createUser, search, getById, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - roles
 *       properties:
 *         username:
 *           type: string
 *           description: The username
 *         password:
 *           type: string
 *           description: The password
 *         email:
 *           type: string
 *           description: The email
 *         firstName:
 *           type: string
 *           description: The first name
 *         lastName:
 *           type: string
 *           description: The last name
 *         roles:
 *           type: array
 *           description: The roles
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user managing API
 */

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/create', createUser);
router.get('/search', search);
router.put('/update', updateUser);
router.get('/:id', getById);
router.delete('/delete/:id', deleteUser);

export default router;