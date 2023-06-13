import React from "react";
import WordCard from "../wordCard/WordCard";
import { WordResponse } from '../interface';
import { cardBackGroundColors } from "../../../utils/customBgColors";

export interface WordListProps {
  words: WordResponse[];
}

const WordList: React.FC<WordListProps> = ({words}) => {
  return(
    <div className="wordListContainer">
      {words.map((word, key) => <WordCard backgroundColor={cardBackGroundColors[key % 5]} key={key} word={word}/>)}
    </div>
  );
}

export default WordList;