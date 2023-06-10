import axios from "axios";
import authHeader from "./auth.header";
import { toast } from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_BASE_URL;

export const getUser = async () => {
  try {
    const response = await axios.get(API_URL + "/user", { headers: authHeader() });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
