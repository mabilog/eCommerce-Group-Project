import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import GlobalProvider from "./components/GlobalContext";

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById("root")
);
