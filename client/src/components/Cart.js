import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import styled from "styled-components";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems } = useContext(GlobalContext);
  return (
    <Wrapper>
      <Title>Shopping Cart</Title>
      <Border></Border>
      {cartItems.map((id) => {
        return <CartItem key={id} id={id} />;
      })}
      <Subtotal>Subtotal(#items): $XX.XX</Subtotal>
    </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 20px 0 0 20px;
  background-color: white;
  width: fit-content;
  border-radius: 7px;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px;
`;

//   let addedNumbers = [];
//   const handleDropdown = (number) => {
//     for (let i = 0; i <= number; i++) {
//       addedNumbers.push(i);
//     }
//     return;
//   };
//   console.log(addedNumbers);

//  <select
//                 onClick={() => {
//                   handleDropdown(item.numInStock);
//                 }}
//               >
//                 {addedNumbers.map((number) => {
//                   return <option>{number} </option>;
//                 })}
//               </select>

export default Cart;
