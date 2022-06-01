import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";

const ItemCard = ({ item }) => {
  const { cartItems, setCartItems } = useContext(GlobalContext);

  const onMouseEnterHandler = (e) => {
    e.target.style.transform = "scale(1.06)";
  };

  const onMouseLeaveHandler = (e) => {
    e.target.style.transform = "scale(1)";
  };

  const addToCart = (_id, e) => {
    e.preventDefault();
    console.log(_id);
    if (!cartItems.includes(_id)) setCartItems([...cartItems, _id]);
  };

  return (
    <>
      <ItemCardLink to={`/items/${item._id}`}>
        <Wrapper>
          <ItemImg
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            src={item.imageSrc}
          />
          <Name>{item.name}</Name>
          <Price>{item.price}</Price>
          <Divider />
          {item.numInStock <= 0 ? (
            <OOSButton>Out of stock</OOSButton>
          ) : (
            // <CartButton>Add to Cart</CartButton>
            <div>
              {cartItems.includes(item._id) ? (
                <CartButton disabled>Added to Cart!</CartButton>
              ) : (
                <CartButton onClick={(e) => addToCart(item._id, e)}>
                  {item.price} - Add to Cart
                </CartButton>
              )}
            </div>
          )}
        </Wrapper>
      </ItemCardLink>
    </>
  );
};

const ItemCardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  text-align: center;
  text-decoration: none;
  margin: auto;
  width: 290px;
  height: 320px;
  margin-bottom: 40px;
  margin-top: 0px;
  padding: 20px;
  /* box-shadow: 10px 10px 5px var(--primary-color); */
  border-radius: 7%;
  color: #000000;
  background-color: #ffffff;
  line-height: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin: auto;
`;

const ItemImg = styled.img`
  margin-bottom: 10px;
  max-height: 150px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 400;
  padding-top: 5px;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: 900;
  padding-top: 5px;
`;

const Divider = styled.hr`
  color: lightgrey;
  background-color: lightgrey;
  height: 1px;
  width: 150px;
  border: 1px transparent;
  border-radius: 10%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CartButton = styled.button`
  width: 160px;
  height: 40px;
  border: 0px;
  color: white;
  background-color: var(--primary-color);
  border-radius: 10px;
  font-weight: 900;
  font-family: "Jost";
  font-size: 14px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
`;
const OOSButton = styled.button`
  width: 160px;
  height: 40px;
  border: 0px;
  color: grey;
  background-color: lightgrey;
  border-radius: 10px;
  font-weight: 900;
  font-family: "Jost";
  font-size: 14px;
`;
export default ItemCard;
