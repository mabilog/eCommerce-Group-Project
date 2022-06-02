import { createContext, useReducer } from "react";

export const ShippingContext = createContext(null);

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  creditCardHolder: "",
  creditCardNumber: null,
  creditCardExp: null,
  creditCardCVV: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "update-first-name": {
      return {
        ...state,
        firstName: action.data,
      };
    }
    case "update-last-name": {
      return {
        ...state,
        lastName: action.data,
      };
    }
    case "update-email": {
      return {
        ...state,
        email: action.data,
      };
    }
    case "update-address": {
      return {
        ...state,
        address: action.data,
      };
    }
    case "update-cc-holder": {
      return {
        ...state,
        creditCardHolder: action.data,
      };
    }
    case "update-cc-number": {
      return {
        ...state,
        creditCardNumber: action.data,
      };
    }
    case "update-cc-exp": {
      return {
        ...state,
        creditCardExp: action.data,
      };
    }
    case "update-cc-cvv": {
      return {
        ...state,
        creditCardCVV: action.data,
      };
    }
    case "reset": {
      return {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        creditCardHolder: "",
        creditCardNumber: null,
        creditCardExp: null,
        creditCardCVV: null,
      };
    }
    default:
      throw new Error("Something went wrong when updating shipping details");
  }
};

export const ShippingProvider = ({ children }) => {
  const [shippingState, dispatch] = useReducer(reducer, initialState);

  const updateFirstName = (data) => {
    dispatch({ type: "update-first-name", data });
  };
  const updateLastName = (data) => {
    dispatch({ type: "update-last-name", data });
  };
  const updateEmail = (data) => {
    dispatch({ type: "update-email", data });
  };
  const updateAddress = (data) => {
    dispatch({ type: "update-address", data });
  };
  const updateCcHolder = (data) => {
    dispatch({ type: "update-cc-holder", data });
  };
  const updateCcNum = (data) => {
    dispatch({ type: "update-cc-number", data });
  };
  const updateCcExp = (data) => {
    dispatch({ type: "update-cc-exp", data });
  };
  const updateCcCvv = (data) => {
    dispatch({ type: "update-cc-cvv", data });
  };
  const resetState = () => {
    dispatch({ type: "reset" });
  };

  return (
    <ShippingContext.Provider
      value={{
        shippingState,
        actions: {
          updateFirstName,
          updateLastName,
          updateEmail,
          updateAddress,
          updateCcHolder,
          updateCcNum,
          updateCcExp,
          updateCcCvv,
          resetState,
        },
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
};
