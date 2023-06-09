import React from "react";
import { Definition } from "../interface";

export interface SearchCardProps {
  item: Definition;
  type: string;
  handleAddWord: (meaning: string) => void;
  backgroundColor: string;
}
const SearchCard: React.FC<SearchCardProps> = ({item, type, handleAddWord, backgroundColor}) => {
  return(
    <div style={{background: backgroundColor}} onClick={() => { handleAddWord(item.definition) }} className="cardContainer">
      <div className="cardHeader">{type}</div>
      <div className="cardContent">
        <p>{item.definition}</p>
      </div>
    </div>
  );
}

export default SearchCard;