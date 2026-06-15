import React, { createContext, useState, useEffect } from "react";

export const myContext = createContext();

export default function MyContext({ children }) {
  const [user, setUser] = useState(null);

  // 🔥 LOAD USER FROM LOCALSTORAGE ON START
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 🔥 UPDATE FUNCTION
  const loginUser = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
  };

  const initialState = {
    user,
    setUser,
    loginUser,
    logoutUser,
  };

  return (
    <myContext.Provider value={initialState}>
      {children}
    </myContext.Provider>
  );
}