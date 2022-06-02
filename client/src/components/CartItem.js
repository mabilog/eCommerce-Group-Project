import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { GlobalContext } from "./GlobalContext";
import { CartContext } from "./CartContext";
const CartItem = ({ item }) => {
  // const { addToCart, removeFromCart, deleteFromCart, cart } =
  // useContext(GlobalContext);

  // const itemObj = cart.find((itm) => itm._id === item._id);
  // console.log(item);
  const [quantity, setQuantity] = useState(0);
  const {
    state,
    actions: {
      addToCart,
      removeFromCart,
      addQuantity,
      removeQuantity,
      deleteFromCart,
    },
  } = useContext(CartContext);

  useEffect(() => {
    console.log(state.cartItems);
    if (state.cartItems.some((itm) => itm._id === item._id)) {
      const itemObj = state.cartItems.find((itm) => itm._id === item._id);
      setQuantity(itemObj.quantity);
    }
  }, [state]);

  // const itemObj = state.cartItems.find((itm) => itm._id === item._id);
  // console.log(itemObj.quantity);

  return (
    <>
      {/* {item && itemObj ? ( */}
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
              <button onClick={() => removeQuantity(item._id)}>-</button>
              <span>
                {quantity}
                {/* {state.cartItems.filter((itm) => itm._id === item._id).quantity} */}
              </span>
              <button
                onClick={() => addQuantity(item._id)}
                // disabled={itemObj.quantity === item.numInStock}
              >
                +
              </button>
              <Delete onClick={() => deleteFromCart(item._id)}>Delete</Delete>
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
  border-radius: 7px;
  margin: 10px 15px 0px;
`;

const Image = styled.img`
  height: 100px;
  border-radius: 7px;
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
  background-color: none;
  text-decoration-style: none;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;
export default CartItem;
