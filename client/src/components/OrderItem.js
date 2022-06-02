import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "./CartContext";
const OrderItem = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const { state } = useContext(CartContext);

  useEffect(() => {
    if (state.cartItems.some((itm) => itm._id === item._id)) {
      const itemObj = state.cartItems.find((itm) => itm._id === item._id);
      setQuantity(itemObj.quantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      {item ? (
        <Div key={item._id}>
          <div>
            <Link to={`/items/${item._id}`}>
              <Image src={item.imageSrc} alt={item.name} />
            </Link>
          </div>
          <div>
            <Name>{item.name}</Name>
            <Price>{item.price}</Price>
            <div>Quantity: {quantity}</div>
          </div>
        </Div>
      ) : null}
    </>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 700px;
  height: 150px;
  margin-top: 20px;
`;

const Image = styled.img`
  height: 100px;
  padding-left: 15px;
  padding-right: 15px;
`;
const Name = styled.div`
  font-size: 18px;
  margin-bottom: 15px;
`;
const Price = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export default OrderItem;
