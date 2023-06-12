import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import { Quiz } from "../models/quizModel";
import { Question } from "../models/questionModel";
import { Word, WordModel } from "../models/wordModel";
import { Op } from "sequelize";

const getRandomAnswer = (words: WordModel[], answers: string[], questionWords?: string[]) => {
  let selectedAnswer;
  const filteredAnswers = answers.filter(answer => !questionWords?.includes(answer));
  do {
    selectedAnswer = words[Math.floor(Math.random()*words.length)];
  } while (filteredAnswers.includes(selectedAnswer.word));
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
    question: question.question,
    answers,
    is_finished: false
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

const finishQuiz = async (quizId: number, userId: number) => {
  const quiz = await Quiz.findOne({ where: {id: quizId, user_id: userId}});
  if (!quiz) {
    throw new Error();
  }

  return {
    correct_count: quiz.correct_count,
    wrong_count: quiz.wrong_count,
    is_finished: true
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
    const response = generateQuestion(words, userId, quiz.id);
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
    const quizId = customReq.params.id;
    let response;
    
    const questions = await Question.findAll({where: {quiz_id: quizId, user_id: userId}});
    if (!questions) {
      throw new Error();
    }

    checkAnswer(customReq);
    if(questions.length === 5) {
      response = await finishQuiz(Number(quizId), userId);
    } else {
      const userId = customReq.user.id;
      const words = await Word.findAll({ 
        where: { 
          user_id: userId, 
          correct_count: { 
            [Op.lt]: 5
          } 
        }
      });
      response = generateQuestion(words, userId, Number(quizId));
    }
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Could not create the question' });
  }
}