import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../utils/getUserData";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData();
      if (user) {
        setUserData(user);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
