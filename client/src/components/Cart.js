import { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import styled from "styled-components";
import CartItem from "./CartItem";
import CreditCard from "./CreditCard";

const Cart = () => {
  const { state, items, setItems } = useContext(CartContext);

  const handleFetch = () => {
    if (state.idsArray)
      fetch(`/api/get-item-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.idsArray),
      })
        .then((res) => res.json())
        .then((data) => setItems(data.itemDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    handleFetch();
  }, [state]);
  return (
    <CartWrapper>
      <Wrapper>
        <Title>Shopping Cart</Title>
        <Border></Border>
        {items?.map((itm) => (
          <CartItem item={itm} key={itm._id} />
        ))}
        <Subtotal>Subtotal(#items): ${state.subtotal.toFixed(2) || 0}</Subtotal>
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
