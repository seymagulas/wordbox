import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import { Word } from "../models/wordModel";


export const getList = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const { id } = customReq.user;
    const wordList = await Word.findAll({ where: { user_id: id }});
    res.status(200).send(wordList);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Could not read word list' });
  }
}

export const addWord = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const { id } = customReq.user;
    const { word, meaning } = req.body;
    const savedWord = await Word.findOne({where: {user_id: id, word}});
    if (savedWord) {
      return res
      .status(422)
      .send({message: 'Word already exists'});
    }
    const newWord = await Word.create({
      user_id: id,
      word,
      meaning,
      correct_count: 0
    });
    res.status(201).send(newWord);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Could not add a new word' });
  }
}