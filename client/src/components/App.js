import { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Cart from "./Cart";
import ItemDetails from "./ItemDetails";

function App() {
  return (
    <div>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <ComponentWrapper>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/items/:itemid">
              <ItemDetails />
            </Route>
            <Route path="/cart/:orderid">
              <Cart />
            </Route>
          </Switch>
        </ComponentWrapper>
      </BrowserRouter>
    </div>
  );
}

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default App;
