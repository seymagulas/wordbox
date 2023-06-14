import React from "react";
import { useState } from "react";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FormData {
  word: string;
}

interface SearchFormProps {
  handleSearch: (word: string) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchForm: React.FC<SearchFormProps> = ({handleSearch, setSearch}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    word: Yup.string().required()
  });

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { isDirty, isValid } 
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const handleValidSubmit = async (data: FormData) => {
    setIsSubmitted(true);
    try {
      setSearch(data.word);
      handleSearch(data.word);
      reset();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsSubmitted(false);
  }
  return(
    <section className="addWordContainer">
    <form className="row row-cols-lg-auto g-3 align-items-center" onSubmit={handleSubmit(handleValidSubmit)}>
      <div className="input-group mb-3">
        <input type="text" className="form-control" id="inputWord" placeholder="Search Word" {...register('word')} aria-label="Search Word" aria-describedby="button-addon2" autoComplete="off" />
        <button disabled={isSubmitted || !isDirty || !isValid} className="btn btn-primary btn-add" type="submit" id="button-addon2"><i className="bi bi-search"></i></button>
      </div>
    </form>
  </section>
  );
}

export default SearchForm;