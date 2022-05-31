import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [itemId, setItemId] = useState();
  const [inventoryData, setInventoryData] = useState();
  const [inStock, setInStock] = useState(true);
  const [login, setLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // CreditCard.js
  const [cardNum, setCardNum] = useState();
  const [cardName, setCardName] = useState();
  const [cardExp, setCardExp] = useState();
  const [cardSec, setCardSec] = useState();

  // CreditCard.js

  const resetCreditCardInfo = () => {
    setCardNum();
    setCardName();
    setCardExp();
    setCardSec();
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
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
        cardNum,
        setCardNum,
        cardName,
        setCardName,
        cardExp,
        setCardExp,
        cardSec,
        setCardSec,
        resetCreditCardInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
