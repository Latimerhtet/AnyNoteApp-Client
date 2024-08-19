import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const existingToken = localStorage.getItem("token");
    return existingToken ? JSON.parse(existingToken) : null;
  });

  const updatedToken = (jwtToken) => {
    const token = JSON.stringify(jwtToken);
    console.log(token);
    localStorage.setItem("token", token);
    setToken(token);
  };

  const signOut = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      setToken(JSON.parse(existingToken));
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, updatedToken, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
