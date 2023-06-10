import React from "react";
import WordCard from "../wordCard/WordCard";
import { WordResponse } from '../interface';

export interface WordListProps {
  words: WordResponse[];
}

const WordList: React.FC<WordListProps> = ({words}) => {
  return(
    <div>
      {words.map(word => <WordCard key={word.id} word={word}/>)}
    </div>
  );
}

export default WordList;