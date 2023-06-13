import React, { ReactNode } from "react";
import { useOutletContext } from 'react-router-dom'
import { WordResponse } from "../interface";
import { deleteWord } from "../../../services/word.service";
import { IWordProvider } from "../../../providers/WordProvider";


export interface WordCardProps {
  word: WordResponse;
  backgroundColor: string;
}
const WordCard: React.FC<WordCardProps> = ({word, backgroundColor}) => {
  const { handleFetchList } = useOutletContext<IWordProvider>();
  const handleWordDelete = async (id: number) => {
    await deleteWord({ id });
    handleFetchList();
  }
  const prepareTrophies = (correctCount: number): ReactNode => {
    const trophies = [];
    for (let index = 0; index < correctCount; index++) {
      trophies.push(<><i className="bi bi-trophy-fill"></i>&nbsp;</>)
    }
    return trophies;
  }

  return(
    <div className="cardContainer" style={{background: backgroundColor}}>
      <div className="cardHeader">{word.word}</div>
      <div className="cardContent">
        <p className="meaning">{word.meaning}</p>
        <h5 className="count">{prepareTrophies(word.correct_count)}</h5>
      </div>
      <button onClick={ () => {handleWordDelete(word.id)}} className="btn btn-danger btn-delete-word">
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}

export default WordCard;