import React from 'react'
import { useState } from "react";
import { createContext } from 'react'

export const MyContext = createContext();

const Provider = ({ children }) => {

  const [userName, setUseName] = useState([]);

  return (
    <MyContext.Provider value={{  }}>
    {children}
  </MyContext.Provider>
  )
}

export default Provider