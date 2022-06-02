import { useContext, useEffect, useState } from "react";
// import { useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import styled from "styled-components";
import CartItem from "./CartItem";
import CreditCard from "./CreditCard";

const Cart = () => {
  const { cart } = useContext(GlobalContext);
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    if (cart)
      fetch(`/api/get-item-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      })
        .then((res) => res.json())
        .then((data) => setItems(data.itemDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartWrapper>
      <Wrapper>
        <Title>Shopping Cart</Title>
        <Border></Border>
        {items?.map((itm) => (
          <CartItem item={itm} key={itm._id} />
        ))}
        <Subtotal>Subtotal(#items): ${subtotal}</Subtotal>
      </Wrapper>
      <Right>
        <CreditCard />
      </Right>
    </CartWrapper>
  );
};
const Title = styled.div`
  font-size: 30px;
  margin: 20px 10px 0px;
`;
const Border = styled.div`
  border-bottom: solid 1px rgb(183, 181, 161);
  margin: 0px 10px 10px 10px;
`;
const CartWrapper = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 20px 0 0 20px;
  background-color: white;
  width: fit-content;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px;
`;

const Right = styled.div``;

export default Cart;
