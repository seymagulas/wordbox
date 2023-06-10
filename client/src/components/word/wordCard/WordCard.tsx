import React from "react";
import './style.css'
import { WordResponse } from "../interface";

export interface WordCardProps {
  word: WordResponse;
}
const WordCard: React.FC<WordCardProps> = ({word}) => {
  return(
    <div className="cardContainer">
      <div className="cardHeader">{word.word}</div>
      <div className="cardContent">
        <p>{word.meaning}</p>
        <p>{word.correct_count}</p>
        </div>
    </div>
  );
}

export default WordCard;