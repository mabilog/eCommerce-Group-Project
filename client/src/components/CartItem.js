import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiTrash2 } from "react-icons/fi";
import { CartContext } from "./CartContext";
const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const {
    state,
    actions: { addQuantity, removeQuantity, deleteFromCart },
  } = useContext(CartContext);

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
            <div>
              <Button onClick={() => removeQuantity(item._id)}>-</Button>
              <span> {quantity} </span>
              <Button onClick={() => addQuantity(item._id)}>+</Button>
              <Delete onClick={() => deleteFromCart(item._id)}>
                <FiTrash2 />
              </Delete>
            </div>
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
  border: solid 1px rgb(183, 181, 161);
  margin: 10px 15px 0px;
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

const Delete = styled.button`
  border: none;
  background-color: transparent;
  text-decoration-style: none;
  font-size: 12px;
  margin-left: 3px;
  &:hover {
    text-decoration: underline;
  }
`;
const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: 0px;
`;

export default CartItem;
