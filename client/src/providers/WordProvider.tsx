import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { WordResponse } from '../components/word/interface';
import { getList } from '../services/word.service';

export interface IWordProvider {
  words: WordResponse[];
  handleFetchList: () => void;
}

const WordProvider = () => {
  const [words, setWords] = useState<WordResponse[]>([]);
  const handleFetchList = () => {
    getList().then(wordsData => setWords(wordsData));
  }

  return <Outlet context={{ words, handleFetchList }} />;
};

export default WordProvider;