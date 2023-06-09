import { Router } from 'express';
import { createQuiz , createQuestion, completeQuiz } from '../controllers/quizController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const quizRouter = Router();

quizRouter.post('/', authMiddleware, createQuiz);
quizRouter.post('/:quizId/question/:questionId', authMiddleware, createQuestion);
quizRouter.post('/:quizId/question/:questionId/complete', authMiddleware, completeQuiz);

