import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

import CartItem from "./CartItem";
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
  return (
    <>
      {orderConfirmation ? (
        <OrdersWrapper>
          <div>Confirmation Code: {orderConfirmation._id}</div>
          <div>Address: {orderConfirmation.address}</div>
          {/* <div>CartOrders: {orderConfirmation.}</div> */}
          <div>
            CartOrders:{" "}
            {items?.map((itm) => (
              <CartItem item={itm} key={itm._id} />
            ))}
          </div>
        </OrdersWrapper>
      ) : null}
    </>
  );
};

const OrdersWrapper = styled.div``;

export default Orders;
