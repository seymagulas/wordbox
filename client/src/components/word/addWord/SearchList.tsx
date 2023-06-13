import React from "react";
import { Meaning } from "../interface";
import SearchCard from "./SearchCard";
import { addWord } from "../../../services/word.service";
import { useNavigate } from "react-router-dom";
import { cardBackGroundColors } from "../../../utils/customBgColors";

interface SearchListProps {
  search: string;
  meanings: Meaning[];
  handleFetchList: () => void;
}

const SearchList: React.FC<SearchListProps> = ({ search, meanings, handleFetchList }) => {
  const navigate = useNavigate();
  const handleAddWord = async (meaning: string ) => {
    const response = await addWord({ word: search, meaning});
    if (response) {
      handleFetchList(); 
      navigate('/word');
    }
  };
  return(
    <div className="searchListContainer">
      {meanings.map((meaning, key1) => 
        meaning.definitions && 
        meaning.definitions.map((definition, key2) => 
        <SearchCard backgroundColor={cardBackGroundColors[key1 % 5]} key={key2} handleAddWord={handleAddWord} type={meaning.partOfSpeech} item={definition}/>
        ))}
    </div>
  );
}

export default SearchList;