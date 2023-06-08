import { Router } from 'express';
import { login, register, userDetails } from '../controllers/authContoller';
import { authMiddleware } from '../middlewares/authMiddleware';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/user', authMiddleware, userDetails );
