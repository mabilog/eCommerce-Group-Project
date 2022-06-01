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

  // Categories.js
  const [categories, setCategories] = useState();

  // CreditCard.js
  const resetCreditCardInfo = () => {
    setCardNum();
    setCardName();
    setCardExp();
    setCardSec();
  };

  useEffect(() => {
    fetch("/api/get-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

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
        categories,
        resetCreditCardInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
