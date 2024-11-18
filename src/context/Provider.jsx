import React from "react";
import { useState } from "react";
import { createContext } from "react";

const MyContext = createContext();

const Provider = ({ children }) => {

  const [userName, setUseName] = useState([]);
  
    

  
  const MyContext = createContext();

  return <MyContext.Provider value={{}}>{children}</MyContext.Provider>;
};

export default Provider;
