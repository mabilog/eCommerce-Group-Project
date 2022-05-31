import { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [itemId, setItemId] = useState();
  const [inventoryData, setInventoryData] = useState();
  const [inStock, setInStock] = useState(true);
  const [login, setLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        itemId,
        setItemId,
        inventoryData,
        setInventoryData,
        inStock,
        setInStock,
        login,
        setLogin,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
