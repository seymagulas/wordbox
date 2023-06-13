import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import { Quiz } from "../models/quizModel";
import { Question } from "../models/questionModel";
import { Word, WordModel } from "../models/wordModel";
import { Op } from "sequelize";

const getRandomAnswer = (words: WordModel[], answers: string[], questionWords?: string[]) => {
  const filteredWords = words.filter(word => !questionWords?.includes(word.word) && !answers.includes(word.word));
  const selectedAnswer = filteredWords[Math.floor(Math.random() * filteredWords.length)];
  return selectedAnswer;
}

const shuffleAnswers = (answers: string[]) => {
  for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
  }
}

const generateQuestion = async (words: WordModel[], userId: number, quizId: number) => {
  const answers: string[] = [];

  const questions = await Question.findAll({ where: { user_id: userId, quiz_id: quizId}});
  const questionWords = questions.map(question => question.answer);

  const correctAnswer = getRandomAnswer(words, answers, questionWords);
  const question = await Question.create({
    user_id: userId,
    quiz_id: quizId,
    question: correctAnswer.meaning,
    answer: correctAnswer.word,
    is_correct: null
  });
  answers.push(correctAnswer.word);
  let fakeAnswer = getRandomAnswer(words, answers);
  answers.push(fakeAnswer.word);
  fakeAnswer = getRandomAnswer(words, answers);
  answers.push(fakeAnswer.word);
  shuffleAnswers(answers);
  const response = {
    quizId,
    questionId: question.id,
    question: question.question,
    answers,
    isFinished: false
  }
  return response;
}

const checkAnswer = async (req: Request) => {
  const customReq = req as CustomRequest;
  const questionId = customReq.params.questionId;
  const quizId = customReq.params.quizId;
  const userId = customReq.user.id;
  const answer = customReq.body.answer;

  const question = await Question.findOne({ where: {id: questionId, user_id: userId}});
  if (!question) {
    throw new Error();
  }

  const quiz = await Quiz.findOne({ where: {id: quizId, user_id: userId}});
  if (!quiz) {
    throw new Error();
  }

  if (question.answer === answer) {
    question.is_correct = true;
    quiz.correct_count++;
    const word = await Word.findOne({ where: {meaning: question.question, user_id: userId}});
    if (word) {
      word.correct_count++;
      await word.save();
    }
  } else {
    question.is_correct = false;
    quiz.wrong_count++;
  }
  await question.save();
  await quiz.save();
}

const generateResult = async (userId: number, quizId: number) => {
  const quiz = await Quiz.findOne({ where: {id: quizId, user_id: userId}});
  if (!quiz) {
    throw new Error();
  }

  const questions = await Question.findAll({ where: {quiz_id: quizId, user_id: userId}});
  if (!questions) {
    throw new Error();
  }

  return {
    correct_count: quiz.correct_count,
    wrong_count: quiz.wrong_count,
    questions
  }
}

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user.id;
    const words = await Word.findAll({ 
      where: { 
        user_id: userId, 
        correct_count: { 
          [Op.lt]: 5
        } 
      }
    });
    if (words.length < 5) {
      return res.status(400).send({ message: 'Insufficient word count' });
    }
    const quiz = await Quiz.create({
      user_id: userId,
      correct_count: 0,
      wrong_count: 0
    });
    const response = await generateQuestion(words, userId, quiz.id);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Could not create the quiz' });
  }
}

export const createQuestion =async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user.id;
    const quizId = customReq.params.quizId;
    
    const questions = await Question.findAll({where: {quiz_id: quizId, user_id: userId}});
    if (!questions) {
      throw new Error();
    }

    await checkAnswer(customReq);

    const words = await Word.findAll({ 
      where: { 
        user_id: userId, 
        correct_count: { 
          [Op.lt]: 5
        } 
      }
    });
    const response = await generateQuestion(words, userId, Number(quizId));
    
    if(questions.length === 4) {
      response.isFinished = true;
    }
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Could not create the question' });
  }
}

export const completeQuiz = async (req: Request, res: Response) => {
  try {
    const customReq = req as CustomRequest;
    const userId = customReq.user.id;
    const quizId = customReq.params.quizId;

    await checkAnswer(customReq);

    const response = await generateResult(userId, Number(quizId));
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Could not complete the quiz' });
  }
}