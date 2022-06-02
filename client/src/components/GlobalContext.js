import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [itemId, setItemId] = useState();
  const [inventoryData, setInventoryData] = useState();
  const [inStock, setInStock] = useState(true);
  const [login, setLogin] = useState(false);
  const [cart, setCart] = useState([]);

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

  // const addToCart = (_id) => {
  //   if (!cart.find((item) => item._id === _id)) {
  //     setCart([...cart, { _id, quantity: 1 }]);
  //   } else {
  //     setCart(
  //       [...cart].map((item) => {
  //         if (item._id === _id) {
  //           return { ...item, quantity: item.quantity + 1 };
  //         } else return item;
  //       })
  //     );
  //   }
  // };

  // const removeFromCart = (_id) => {
  //   const newCart = cart.map((item) => {
  //     if (item._id === _id) {
  //       const newItem = { ...item, quantity: item.quantity - 1 };
  //       return newItem;
  //     } else return item;
  //   });

  //   setCart(
  //     newCart.filter((item) => {
  //       if (item.quantity < 1) return null;
  //       else return item;
  //     })
  //   );
  // };

  // const deleteFromCart = (_id) => {
  //   setCart(cart.filter((item) => item._id !== _id));
  // };
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
        cart,
        setCart,
        cardNum,
        setCardNum,
        cardName,
        setCardName,
        cardExp,
        setCardExp,
        cardSec,
        setCardSec,
        categories,
        setCategories,
        items,
        setItems,
        orderConfirmation,
        setOrderConfirmation,
        // addToCart,
        // removeFromCart,
        // deleteFromCart,
        resetCreditCardInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
