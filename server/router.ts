import { authRouter } from './routes/authRouter';

import { Request, Response, Router } from 'express';

export const router = Router();

router.use('/', authRouter);
router.use('*', (req: Request, res: Response) => {
  res.status(404);
  res.send('Not found');
});