import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { CustomRequest } from '../middlewares/authMiddleware';
const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword, name } = req.body;
    const user = await User.findOne({ where: { email: email } });
    
    if(user) {
      return res
      .status(422)
      .send({message: 'User already exists, please login.'});
    }
    
    if (password === '') {
      return res
      .status(422)
      .send({message: 'Password cannot be empty.'});
    }

    if (password !== confirmPassword) {
      return res
      .status(422)
      .send({message: 'Passwords do not match.'});
    }

    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email,
      name,
      password: hash
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Could not create user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    
    if (!user) {
      throw new Error();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      throw new Error();
    }

    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.status(200).send({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'Username or password is incorrect' });
  }
};

export const userDetails = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const { id, name, email } = customReq.user;
    res.status(200).send({ id, name, email });
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: 'Not found' });
  }
};
