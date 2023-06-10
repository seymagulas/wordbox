import axios from "axios";
import authHeader from "./auth.header";
import { Meaning } from "../components/word/interface";
import { toast } from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_BASE_URL;
const DICTIONARY_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

export const getList = async () => {
  return axios
  .get(API_URL + "/word", { headers: authHeader() })
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    toast.error(error.response.data.message);
  });
};

export interface AddWordProps {
  word: string;
  meaning: string;
}

export const addWord = async ({ word, meaning }: AddWordProps) => {
  return axios
    .post(API_URL + "/word", {
      word,
      meaning
    }, { headers: authHeader() })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
};

export interface SearchWordProps {
  word: string;
}

export const searchWord = async ({ word }: SearchWordProps): Promise<Meaning[]> => {
  return await axios
  .get(DICTIONARY_URL + word)
  .then((response) => {
    console.log(response);
    return response.data[0]['meanings'];
  });
}