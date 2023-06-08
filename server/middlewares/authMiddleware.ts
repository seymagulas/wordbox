import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User, UserModel } from '../models/userModel';
const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';

export interface CustomRequest extends Request {
  user: UserModel;
}

type tokenProps = {
  id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    return res.sendStatus(403);
  }
  const token = authHeaders.split(' ')[1].replace(/"/g, '');
  try {
    const { id } = jwt.verify(token, SECRET_KEY) as tokenProps;
    const user = await User.findOne({ where: { id } });
    
    if (!user) {
      throw new Error();
    }

    (req as CustomRequest).user = user;
    next();
  } catch (error) {
    res.status(401).send({error, message: 'Please authenticate'});
  }
}