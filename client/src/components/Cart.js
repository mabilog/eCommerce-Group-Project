import { items } from "../data/items";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Cart = () => {
  return (
    <>
      <Wrapper>
        <Title>Shopping Cart</Title>
        <Border></Border>
        {items.slice(0, 2).map((item, index) => {
          console.log(item);
          return (
            <Div key={item._id}>
              <div>
                <Link to={`/items/${item._id}`}>
                  <Image src={item.imageSrc} alt={item.name} />
                </Link>
              </div>
              <div>
                <Name>{item.name}</Name>
                <Price>{item.price}</Price>

                <Select>
                  <option>Qty: {item.numInStock}</option>
                  <option>8</option>
                  <option>7</option>
                  <option>6</option>
                  <option>4</option>
                </Select>

                <Delete>Delete</Delete>
              </div>
            </Div>
          );
        })}
        <Subtotal>Subtotal(#items): $XX.XX</Subtotal>
      </Wrapper>
    </>
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
const Select = styled.select`
  width: 60px;
  height: 20px;
  margin-right: 10px;
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
