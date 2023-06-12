import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CompleteQuizResponse } from '../../services/quiz.service';
import './quiz.css'
import { Link } from 'react-router-dom';

const QuizResult: React.FC = () => {
  const [result, setResult] = useState<CompleteQuizResponse>();
  const location = useLocation();
  useEffect(() => {
    const quizResult = location.state.result;
    if (quizResult) {
      setResult(quizResult);
    }
  }, []);

  return(
    <div className='quizResultContainer container'>
      <h3>Quiz has been completed!</h3>
      <h4>{result?.correct_count} / 5</h4>
      <p>Here are the results:</p>
      {result?.questions.map((question, key) => {
        const divClassName = question.is_correct ? 'correctAnswer' : 'wrongAnswer';
        return (
          <div key={key} className={'questionResult ' + divClassName}>
            <p>{question.question}</p>
            <p>Correct answer: {question.answer}</p>
          </div>
        )
      })}
      <Link to='/' className='btn btn-dark'>Main Menu</Link>
    </div>
  );
}

export default QuizResult;