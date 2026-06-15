import React, { createContext, useState } from "react";

export const myContext = createContext();

export default function MyContext({ children }) {
  const [user, setUser] = useState(null);

  const initialState = {
    user,
    setUser,
  };

  return (
    <myContext.Provider value={initialState}>
      {children}
    </myContext.Provider>
  );
}