import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL + "/api/auth";

/* GET ALL */
export const getEmployees = () => {
  const token = localStorage.getItem("token");

  return axios.get(`${BASE_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* ADD */
export const addEmployee = (data) => {
  const token = localStorage.getItem("token");

  return axios.post(
    `${BASE_URL}/add`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

/* UPDATE */
export const updateEmployee = (id, data) => {
  const token = localStorage.getItem("token");

  return axios.put(
    `${BASE_URL}/update/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

/* DELETE */
export const deleteEmployee = (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(
    `${BASE_URL}/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};