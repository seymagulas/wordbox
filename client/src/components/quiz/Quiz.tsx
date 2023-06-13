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
      <p><i className="bi bi-dot"></i>&nbsp;Take advantage of an interactive quiz generated from your saved words.</p>
      <p><i className="bi bi-dot"></i>&nbsp;To start a quiz you need to have at least five words in your WordBox.</p>
      <p><i className="bi bi-dot"></i>&nbsp;If you have answered a word correctly five times, that word will not appear in the quiz again.</p>
      <br/>
      <p><i className="bi bi-dot"></i>&nbsp;Ready ? Time to test your knowledge!</p>
      <button onClick={() => handleQuizStart()} className='btn btn-success btn-add'>
        Start Quiz
      </button>
    </div>
  );
}

export default Quiz;