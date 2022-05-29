// ItemCard will link to ItemDetails (like in fruit store exercise)
import { useEffect, useContext } from "react";
import styled from "styled-components";

import { items } from "../data/items";
const ItemDetails = () => {
  console.log(items[0]);
  return (
    <ItemDetailsWrapper>
      <Left>
        <img src={items[0].imageSrc} alt={items[0].name} srcset="" />
      </Left>
      <Center></Center>
      <Right>
        <div>
          <h3>{items[0].name}</h3>
          <p>{items[0].category}</p>
        </div>
        <div></div>
        <div>
          <button>{items[0].price} - </button>
        </div>
      </Right>
    </ItemDetailsWrapper>
  );
};

const ItemDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Left = styled.div``;
const Center = styled.div``;
const Right = styled.div``;

export default ItemDetails;
