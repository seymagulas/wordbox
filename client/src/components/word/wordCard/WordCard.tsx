import React from "react";
import { useOutletContext } from 'react-router-dom'
import { WordResponse } from "../interface";
import { deleteWord } from "../../../services/word.service";
import { IWordProvider } from "../../../providers/WordProvider";


export interface WordCardProps {
  word: WordResponse;
}
const WordCard: React.FC<WordCardProps> = ({word}) => {
  const { handleFetchList } = useOutletContext<IWordProvider>();
  const handleWordDelete = async (id: number) => {
    await deleteWord({ id });
    handleFetchList();
  }

  return(
    <div className="cardContainer">
      <div className="cardHeader">{word.word}</div>
      <div className="cardContent">
        <p>{word.meaning}</p>
        <p>{word.correct_count}</p>
      </div>
      <button onClick={ () => {handleWordDelete(word.id)}} className="btn btn-danger btn-delete-word">
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}

export default WordCard;