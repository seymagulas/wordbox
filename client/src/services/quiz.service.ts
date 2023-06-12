import axios from "axios";
import authHeader from "./auth.header";
import { toast } from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export interface CreateQuizResponse {
  quizId: number,
  questionId: number,
  question: string,
  answers: string[],
  isFinished: boolean
}

export const createQuiz = async (): Promise<CreateQuizResponse> => {
  try {
    const response = await axios.post(API_URL + "/quiz", {}, { headers: authHeader() });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export interface CreateQuestionProps {
  quizId: number;
  questionId: number;
  answer: string;
}

export const createQuestion = async ({ quizId, questionId, answer }: CreateQuestionProps) => {
  try {
    const response = await axios.post(API_URL + "/quiz/" + quizId + "/question/" + questionId, {
      answer
    }, { headers: authHeader() });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export interface Question {
  answer: string,
  question: string,
  is_correct: boolean
}

export interface CompleteQuizResponse {
  correct_count: number,
  wrong_count: number,
  questions: Question[]
}

export const completeQuiz = async ({ quizId, questionId, answer }: CreateQuestionProps) => {
  try {
    const response = await axios.post(API_URL + "/quiz/" + quizId + "/question/" + questionId + "/complete", {
      answer
    }, { headers: authHeader() });
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};