import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom'
import SearchForm from "./SearchForm";
import SearchList from "./SearchList";
import { searchWord } from "../../../services/word.service";
import { Meaning } from "../interface";
import { IWordProvider } from "../../../providers/WordProvider";

const AddWord: React.FC = () => {
  const [search, setSearch] = useState<string>();
  const [meanings, setMeanings] = useState<Meaning[]>([]);

  const { handleFetchList } = useOutletContext<IWordProvider>();
  
  const handleSearch = async (word: string) => {
    setSearch(word);
    const response = await searchWord({ word });
    if (response) {
      setMeanings(response);
    }
  }

  return(
    <div className="searchContainer container">
      <SearchForm setSearch={setSearch} handleSearch={handleSearch} />
      <SearchList search={search} handleFetchList={handleFetchList} meanings={meanings} />
    </div>
  );
}

export default AddWord;