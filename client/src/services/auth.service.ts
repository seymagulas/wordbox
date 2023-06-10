import axios from "axios";
import { toast } from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_BASE_URL;

interface registerProps {
  name: string; 
  password: string;
  confirmPassword: string;
  email: string;
}

export const registerUser = async ({name, email, password, confirmPassword}: registerProps) => {
  try {
    const response = await axios.post(API_URL + "/register", {
      name,
      email,
      password,
      confirmPassword
    });
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

interface loginProps {
  email: string; 
  password: string;
}

export const login = async ({email, password}: loginProps) => {
  try {
    const response = await axios.post(API_URL + "/login", {
      email,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    return JSON.parse(userStr)
  }
  return null;
};