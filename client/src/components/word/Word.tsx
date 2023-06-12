import React, { useEffect } from 'react';
import WordList from "./wordList/WordList";
import { Link, useOutletContext } from 'react-router-dom';
import { IWordProvider } from '../../providers/WordProvider';
import './word.css'

const Word: React.FC = () => {
  const { handleFetchList, words } = useOutletContext<IWordProvider>();

  useEffect(() => {
    handleFetchList();
  }, []);

  return(
    <div className='wordContainer container'>
      <Link className='btn btn-success btn-add' to="/word/add">
        + Add New Word
      </Link>
      <WordList words={words}/>
    </div>
  );
}

export default Word;