import axios from "axios";
import authHeader from "./auth.header";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getUser = () => {
  return axios
  .get(API_URL + "/user", { headers: authHeader() })
  .then((response) => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });;
};
