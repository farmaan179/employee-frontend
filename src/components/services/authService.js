import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/auth";

// REGISTER USER
export const registerUser = (data) => {
  return axios.post(`${BASE_URL}/register`, data);
};

// LOGIN USER
export const loginUser = (data) => {
  return axios.post(`${BASE_URL}/login`, data);
};