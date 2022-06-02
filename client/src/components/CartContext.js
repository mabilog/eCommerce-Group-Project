import { createContext, useReducer } from "react";

export const CartContext = createContext(null);

const initialState = {
  cartItems: [],
  idsArray: [],
  // subtotal: 0,
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
        // subtotal: ...state.subtotal + action.price * 1
      };
    }
    case "remove-from-cart": {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== action._id),
        ],
      };
    }
    case "add-quantity": {
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
      };
    }
    case "delete-from-cart": {
      console.log(action);
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== action.data),
        ],
        idsArray: [...state.idsArray.filter((item) => item !== action.data)],
      };
    }
    default:
      throw new Error("Something went wrong");
  }
};

export const CartProvider = ({ children }) => {
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
