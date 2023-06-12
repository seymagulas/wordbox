import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, } from 'react-router-dom';
import './question.css'
import { completeQuiz, createQuestion, CreateQuizResponse } from '../../services/quiz.service';

const Question: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [response, setResponse] = useState<CreateQuizResponse>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const questionResponse = location.state.response;
    if (questionResponse) {
      setResponse(questionResponse);
    }
  }, []);
  
  const handleNextQuestion = async () => {
    const newResponse = await createQuestion({ 
      quizId: response.quizId, 
      questionId: response.questionId,
      answer: selectedAnswer
    });
    setSelectedAnswer('');
    if (newResponse) {
      setResponse(newResponse);
    }
  }

  const handleAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  }

  const handleFinishQuiz = async () => {
    const newResponse = await completeQuiz({ 
      quizId: response.quizId, 
      questionId: response.questionId,
      answer: selectedAnswer
    });
    
    setSelectedAnswer('');

    if (newResponse) {
      navigate('/quiz/result', {
        state: {
          result: newResponse
        }
      });
    }
  }

  return(
    <div className='questionContainer container'>
      <div className='cardContainer'>
        <h3>{'>'} {response?.question}</h3>
      </div>
      <div className='answers'>
        {response?.answers.map((answer: string, key: number) => (
          <div key={key} className='form-check'>
            <input checked={selectedAnswer === answer} type="radio" className="btn-check" name="answer" id={answer} autoComplete="off" />
            <label onClick={() => handleAnswerChange(answer)} className="btn btn-outline-dark btn-answer" htmlFor={answer}>{answer}</label>
          </div>
        ))}
      </div>
      <div className='button-div'>
        {response?.isFinished ? 
         (<button onClick={() => handleFinishQuiz()} className='btn btn-success'>Finish</button>) :
         (<button onClick={() => handleNextQuestion()} className='btn btn-dark'>Continue <i className="bi bi-arrow-right-circle-fill"></i></button>) 
        }
      </div>
    </div>
  );
}

export default Question;