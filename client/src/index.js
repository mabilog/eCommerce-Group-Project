import ReactDOM from "react-dom";
import App from "./components/App";
import GlobalProvider from "./components/GlobalContext";
import { CartProvider } from "./components/CartContext";
import { ShippingProvider } from "./components/ShippingContext";

ReactDOM.render(
  <GlobalProvider>
    <CartProvider>
      <ShippingProvider>
        <App />
      </ShippingProvider>
    </CartProvider>
  </GlobalProvider>,
  document.getElementById("root")
);
