import { createContext, useReducer, useState } from "react";

export const CartContext = createContext(null);

const initialState = {
  cartItems: [],
  idsArray: [],
  subtotal: 0,
  totalItems: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add-to-cart": {
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            _id: Number(Object.values(action)[0]),
            price: Number(Object.values(action)[1]),
            quantity: 1,
          },
        ],
        idsArray: [...state.idsArray, Number(Object.values(action)[0])],
        subtotal: state.subtotal + Number(Object.values(action)[1]),
        totalItems: state.totalItems + 1,
      };
    }
    case "remove-from-cart": {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== action._id),
        ],
        subtotal: state.subtotal - Number(Object.values(action)[1]),
        totalItems: state.totalItems - 1,
      };
    }
    case "add-quantity": {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map((item) => {
            return action.data === item._id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          }),
        ],
        subtotal:
          state.subtotal +
          state.cartItems.find((item) => {
            return item._id === action.data ? item.price : null;
          }).price,
        totalItems: state.totalItems + 1,
      };
    }
    case "remove-quantity": {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map((item) => {
            if (action.data === item._id) {
              const newItem = { ...item, quantity: item.quantity - 1 };
              return newItem;
            } else {
              return item;
            }
          }),
        ],
        subtotal:
          state.subtotal -
          state.cartItems.find((item) => {
            return item._id === action.data ? item.price : null;
          }).price,
        totalItems: state.totalItems - 1,
      };
    }
    case "delete-from-cart": {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== action.data),
        ],
        idsArray: [...state.idsArray.filter((item) => item !== action.data)],
        subtotal:
          state.subtotal -
          state.cartItems.find((item) => {
            return item._id === action.data ? item.price : null;
          }).price *
            state.cartItems.find((item) => {
              return item._id === action.data ? item.quantity : null;
            }).quantity,
        totalItems:
          state.totalItems -
          state.cartItems.find((item) => {
            return item._id === action.data ? item.quantity : null;
          }).quantity,
      };
    }
    default:
      throw new Error("Something went wrong");
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (...data) => {
    dispatch({ type: "add-to-cart", ...data });
  };
  const removeFromCart = (data) => {
    dispatch({ type: "remove-from-cart", data });
  };
  const addQuantity = (data) => {
    dispatch({ type: "add-quantity", data });
  };
  const removeQuantity = (data) => {
    dispatch({ type: "remove-quantity", data });
  };
  const deleteFromCart = (data) => {
    dispatch({ type: "delete-from-cart", data });
  };
  return (
    <CartContext.Provider
      value={{
        state,
        actions: {
          addToCart,
          removeFromCart,
          addQuantity,
          removeQuantity,
          deleteFromCart,
        },
        items,
        setItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
