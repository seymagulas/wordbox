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
    formState: { errors, isDirty, isValid } 
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
      <div className="col-12">
        <input type="text" className="form-control" id="inputWord" placeholder="Search Word" {...register('word')} />
      </div>
      <div className="col-12">
        <button type="submit" disabled={isSubmitted || !isDirty || !isValid} className="btn btn-primary">Search</button>
      </div>
    </form>
    <div className="form-text text-danger">
      {errors.word && <p>{errors.word.message}</p>}
    </div>
  </section>
  );
}

export default SearchForm;