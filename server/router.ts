import { authRouter } from './routes/authRouter';
import { wordRouter } from './routes/wordRouter';
import { quizRouter } from './routes/quizRouter';
import { Request, Response, Router } from 'express';

export const router = Router();

router.use('/', authRouter);
router.use('/word', wordRouter);
router.use('/quiz', quizRouter);
router.use('*', (req: Request, res: Response) => {
  res.status(404);
  res.send('Not found');
});