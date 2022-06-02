import { createContext, useReducer, useState } from "react";

export const CartContext = createContext(null);

const initialState = {
  cartItems: [],
  idsArray: [],
  subtotal: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add-to-cart": {
      console.log(action);
      console.log(state);
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
      };
    }
    case "remove-from-cart": {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== action._id),
        ],
        subtotal: state.subtotal - Number(Object.values(action)[1]),
      };
    }
    case "add-quantity": {
      console.log(action);
      console.log(state);
      return {
        ...state,
        cartItems: [
          ...state.cartItems.map((item) => {
            if (action.data === item._id) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          }),
        ],
        subtotal:
          state.subtotal +
          state.cartItems.find((item) => {
            if (item._id === action.data) {
              return item.price;
            }
          }).price,
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
            if (item._id === action.data) {
              return item.price;
            }
          }).price,
      };
    }
    case "delete-from-cart": {
      console.log(action);
      console.log(state.cartItems);
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== action.data),
        ],
        idsArray: [...state.idsArray.filter((item) => item !== action.data)],
        subtotal:
          state.subtotal -
          state.cartItems.find((item) => {
            if (item._id === action.data) {
              return item.price;
            }
          }).price *
            state.cartItems.find((item) => {
              if (item._id === action.data) return item.quantity;
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
