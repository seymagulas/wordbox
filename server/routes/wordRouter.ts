import { Router } from 'express';
import { getList, addWord, deleteWord } from '../controllers/wordController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const wordRouter = Router();

wordRouter.get('/', authMiddleware, getList);
wordRouter.post('/', authMiddleware, addWord);
wordRouter.delete('/:id', authMiddleware, deleteWord);
