import { useState, useEffect } from 'react';
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './Header';
import Home from './Home';
import Cart from './Cart';
import ItemDetails from './ItemDetails';

function App() {

  return <div>
    <BrowserRouter>
    <Header/>
    <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/items/:itemid">
            <ItemDetails />
          </Route>
          <Route path="/cart/:orderid">
            <Cart/>
          </Route>
        </Switch>
    </BrowserRouter>
    </div>;
}

export default App;
