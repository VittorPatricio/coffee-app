import React, { createContext, useState } from "react";

export const LovedContext = createContext();

const LovedProvider = ({ children }) => {
  const [loved, setLoved] = useState([]);

  return (
    <LovedContext.Provider value={{ loved, setLoved }}>
      {children}
    </LovedContext.Provider>
  );
};

export default LovedProvider;
