import React, { createContext, useContext, useState } from 'react';

const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  const incrementPoints = () => {
    setPoints((prevPoints) => prevPoints + 10);
  };

  return (
    <PointsContext.Provider value={{ points, incrementPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext);
