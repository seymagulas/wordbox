import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom'
import SearchForm from "./searchForm/SearchForm";
import SearchList from "./searchList/SearchList";
import { searchWord } from "../../../services/word.service";
import { Meaning } from "../interface";
import { IWordProvider } from "../../../providers/WordProvider";

const AddWord: React.FC = () => {
  const [search, setSearch] = useState<string>();
  const [meanings, setMeanings] = useState<Meaning[]>([]);

  const { handleFetchList } = useOutletContext<IWordProvider>();
  
  const handleSearch = (word: string) => {
    setSearch(word);
    searchWord({ word }).then(meaningsData => setMeanings(meaningsData));
  }
  return(
    <div className="searchContainer">
      <SearchForm setSearch={setSearch} handleSearch={handleSearch} />
      <SearchList search={search} handleFetchList={handleFetchList} meanings={meanings} />
    </div>
  );
}

export default AddWord;