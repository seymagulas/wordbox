import React, { useEffect } from 'react';
import './style.css'
import WordList from "./wordList/WordList";
import { Link, useOutletContext } from 'react-router-dom';
import { IWordProvider } from '../../providers/WordProvider';

const Word: React.FC = () => {
  const { handleFetchList, words } = useOutletContext<IWordProvider>();

  useEffect(() => {
    handleFetchList();
  }, []);

  return(
    <div className='wordContainer'>
      <Link className='btn btn-success btn-add' to="/word/add">
        + Add New Word
      </Link>
      <WordList words={words}/>
    </div>
  );
}

export default Word;