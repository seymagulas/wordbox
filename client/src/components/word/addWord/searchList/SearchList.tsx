import React from "react";
import { Meaning } from "../../interface";
import SearchCard from "../searchCard/SearchCard";
import { addWord } from "../../../../services/word.service";
import './style.css'

interface SearchListProps {
  search: string;
  meanings: Meaning[];
  handleFetchList: () => void;
}

const SearchList: React.FC<SearchListProps> = ({ search, meanings, handleFetchList }) => {
  const handleAddWord = (meaning: string ) => {
    addWord({ word: search, meaning}).then(() => { handleFetchList(); });
  };
  return(
    <div>
      {meanings.map(meaning => 
        meaning.definitions && 
        meaning.definitions.map((definition, key) => 
        <SearchCard key={key} handleAddWord={handleAddWord} type={meaning.partOfSpeech} item={definition}/>
        ))}
    </div>
  );
}

export default SearchList;