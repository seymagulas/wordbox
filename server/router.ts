import { authRouter } from './routes/authRouter';
import { wordRouter } from './routes/wordRouter';

import { Request, Response, Router } from 'express';

export const router = Router();

router.use('/', authRouter);
router.use('/word', wordRouter);
router.use('*', (req: Request, res: Response) => {
  res.status(404);
  res.send('Not found');
});