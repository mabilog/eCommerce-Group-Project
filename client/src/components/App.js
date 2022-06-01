// yarn install
// yarn add react-router-dom
//yarn add styled-components
// yarn start

// import { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Cart from "./Cart";
import ItemDetails from "./ItemDetails";
import CreditCard from "./CreditCard";
import Orders from "./Orders";
import Categories from "./Categories";
import Category from "./Category";

function App() {
  return (
    <AppWrapper>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <ComponentWrapper>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CreditCard />} />
            <Route path="/items/:itemId" element={<ItemDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:category" element={<Category />} />
          </Routes>
        </ComponentWrapper>
      </BrowserRouter>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default App;
