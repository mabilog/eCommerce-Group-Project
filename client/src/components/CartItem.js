import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const CartItem = ({ id }) => {
  const [item, setItem] = useState();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/get-items/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optionsLoop = () => {
    const options = [];
    for (let i = 1; i <= item.numInStock; i++) {
      options.push(
        <option value={i} onClick={(e) => setQuantity(e.target.value)}>
          {i}
        </option>
      );
    }
    return options;
  };

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

            <Select>{optionsLoop()}</Select>

            <Delete>Delete</Delete>
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
export default CartItem;
