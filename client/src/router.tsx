import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AuthGuard from './services/auth.guard';

import Register from './components/register/Register';
import Login from './components/login/Login';
import Main from './components/main/Main';
import NotFound from './components/notFound/NotFound';
import Word from './components/word/Word';
import WordProvider from './providers/WordProvider';
import AddWord from './components/word/addWord/AddWord';
import NavBar from './components/navbar/NavBar';
import Quiz from './components/quiz/Quiz';
import Question from './components/question/Question';
import QuizResult from './components/quiz/QuizResult';

const AppRouter: React.FC = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/register' && <NavBar />}
      <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route element={<AuthGuard />}>
        <Route path='/' element={<Main />} />
        <Route path="/word" element={<WordProvider />}>
          <Route index element={<Word />} />
          <Route path="/word/add" element={<AddWord />} />
        </Route>
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/quiz/result' element={<QuizResult />} />
        <Route path='/question' element={<Question />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
    </>
  )
}

export default AppRouter;
