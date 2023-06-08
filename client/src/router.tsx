import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthGuard from './services/auth.guard';

import Register from './components/register/Register';
import Login from './components/login/Login';
import Main from './components/main/Main';
import NotFound from './components/notFound/NotFound';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route element={<AuthGuard />}>
        <Route path='/main' element={<Main />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter;
