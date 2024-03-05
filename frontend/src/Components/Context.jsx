import React, { createContext, useState } from "react";

export const context = createContext();

export const ContextProvider = ({ children }) => {
  const [userID, setuserID] = useState();
  const [applyID, setapplyID] = useState();
  const [postID, setpostID] = useState();

  return (
    <context.Provider value={{ userID, setuserID,applyID, setapplyID,postID, setpostID }}>
      {children}
    </context.Provider>
  );
};