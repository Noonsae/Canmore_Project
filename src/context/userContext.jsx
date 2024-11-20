import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user_id, setUser_id] = useState('');

  return <UserContext.Provider value={{ user_id, setUser_id }}>{children}</UserContext.Provider>;
};
