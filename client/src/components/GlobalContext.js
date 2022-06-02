import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  // Categories.js
  const [categories, setCategories] = useState();

  // CreditCard.js
  // ListingGrid.js
  const [items, setItems] = useState([]);

  const [orderConfirmation, setOrderConfirmation] = useState();
  useEffect(() => {
    fetch("/api/get-categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories));

    fetch("/api/get-items")
      .then((res) => res.json())
      .then((itemsDataObj) => {
        setItems(itemsDataObj.data);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        categories,
        setCategories,
        items,
        setItems,
        orderConfirmation,
        setOrderConfirmation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
