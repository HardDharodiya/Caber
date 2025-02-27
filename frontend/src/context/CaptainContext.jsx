import React, { createContext, useEffect, useState } from "react";
import { getUserData } from "../utils/getUserData";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captainData, setCaptainData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUserData();
      if (user) {
        setCaptainData(user);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <CaptainDataContext.Provider value={{ captainData, setCaptainData }}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  );
};

export default CaptainContext;
