import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile-tabletop")));
  

  const navigate = useNavigate();

  useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("profile-tabletop"));
    setUser(userInfo);
    
  }, [navigate]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;