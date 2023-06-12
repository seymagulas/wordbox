import React from 'react';
import { useNavigate } from 'react-router-dom';
import './quiz.css'
import { createQuiz } from '../../services/quiz.service';

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const handleQuizStart = async () => {
    const response = await createQuiz();
    if (response) {
      navigate('/question', {
        state: {
          response
        }
      });
    }
  }
  return(
    <div className='quizContainer container'>
      <p>Time to test your knowledge!</p>
      <button onClick={() => handleQuizStart()} className='btn btn-success btn-add'>
        Start Quiz
      </button>
    </div>
  );
}

export default Quiz;