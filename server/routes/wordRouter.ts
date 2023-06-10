import { Router } from 'express';
import { getList, addWord } from '../controllers/wordController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const wordRouter = Router();

wordRouter.get('/', authMiddleware, getList);
wordRouter.post('/', authMiddleware, addWord);
