import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";

const ItemCard = ({ item }) => {
  const { addToCart } = useContext(GlobalContext);

  const onMouseEnterHandler = (e) => {
    e.target.style.transform = "scale(1.06)";
  };

  const onMouseLeaveHandler = (e) => {
    e.target.style.transform = "scale(1)";
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
          <Divider />
          <Price>{item.price}</Price>

          {item.numInStock <= 0 ? (
            <>
              <OOSButton>Out of stock</OOSButton>
            </>
          ) : (
            <div></div>
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
  width: 270px;
  height: 320px;
  margin-bottom: 40px;
  margin-left: 50px;
  margin-right: 50px;
  padding: 20px;
  color: #000000;
  background-color: #ffffff;
  line-height: 20px;
  z-index: 0;
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
  z-index: 1;
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

// const CartButton = styled.button`
//   padding: 15px 35px;
//   border: 0px;
//   color: white;
//   background-color: var(--primary-color);
//   border-radius: 5px;
//   font-family: "Jost";
//   font-size: 14px;
//   font-weight: 900;
//   cursor: pointer;

//   &:disabled {
//     opacity: 0.5;
//     pointer-events: none;
//     cursor: not-allowed;
//   }
// `;
const OOSButton = styled.button`
  padding: 10px 25px;
  border: 0px;
  color: grey;
  background-color: lightgrey;
  border-radius: 5px;
  font-weight: 900;
  font-family: "Jost";
  font-size: 14px;
  margin-top: 10px;
`;
export default ItemCard;
