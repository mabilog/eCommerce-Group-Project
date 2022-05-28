import { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [itemId, setItemId] = useState();
  const [inventoryData, setInventoryData] = useState();
  const [inStock, setInStock] = useState(true);

  return (
    <GlobalContext.Provider
      value={{
          itemId,
          setItemId,
          inventoryData,
          setInventoryData,
          inStock,
          setInStock
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
