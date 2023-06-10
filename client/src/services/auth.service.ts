import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

interface registerProps {
  name: string; 
  password: string;
  confirmPassword: string;
  email: string;
}

export const registerUser = ({name, email, password, confirmPassword}: registerProps) => {
  return axios.post(API_URL + "/register", {
    name,
    email,
    password,
    confirmPassword
  });
};

interface loginProps {
  email: string; 
  password: string;
}

export const login = ({email, password}: loginProps) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
      }

      return response.data;
    });
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