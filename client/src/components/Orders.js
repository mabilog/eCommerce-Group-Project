import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import OrderItem from "./OrderItem";

import styled from "styled-components";
const Orders = () => {
  const { orderConfirmation } = useContext(GlobalContext);
  console.log(orderConfirmation);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const orders = orderConfirmation.cartItems.map((item) => item._id);
    fetch(`/api/get-item-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orders),
    })
      .then((res) => res.json())
      .then((data) => setItems(data.itemDetails));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("Items", items);
  return (
    <>
      {orderConfirmation ? (
        <OrdersWrapper>
          <ConfirmationWrapper>
            <Header>Success! Your order is confirmed</Header>
            <div>Order Confirmation #: {orderConfirmation._id}</div>
            <div>Total: PRICE HERE</div>
          </ConfirmationWrapper>
          {/* <div>CartOrders: {orderConfirmation.}</div> */}
          <BigDiv>
            {items?.map((itm) => (
              <OrderItemsDiv>
                <OrderItem item={itm} key={itm._id} />
              </OrderItemsDiv>
            ))}
          </BigDiv>
        </OrdersWrapper>
      ) : null}
    </>
  );
};

const OrdersWrapper = styled.div`
  margin: auto;
`;

const ConfirmationWrapper = styled.div`
  text-align: center;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 3pt;
  text-transform: uppercase;
  /* text-align: center; */
  color: #be974c;
  margin-bottom: 10px;
`;

const OrderItemsDiv = styled.div`
  margin: auto;
  max-width: 700px;
  border-bottom: 1px dotted var(--primary-color);
`;

const BigDiv = styled.div`
  background-color: #ffffff;
  max-width: 800px;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`;

export default Orders;
