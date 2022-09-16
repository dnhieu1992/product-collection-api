import express from 'express';
import { createUser } from '../controllers/user.controller.js';
import { verifyToken } from '../shared/middleware/VerifyToken.js';

const router = express.Router();
router.post('/create', verifyToken, createUser);

export default router;