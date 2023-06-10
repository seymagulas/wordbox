import React from "react";
import './App.css';
import AppRouter from './router';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <>
      <AppRouter />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
