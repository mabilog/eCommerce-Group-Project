// ItemCard will link to ItemDetails (like in fruit store exercise)
import { useEffect, useContext } from "react";
import styled from "styled-components";

import { items } from "../data/items";
const ItemDetails = () => {
  console.log(items[0]);
  /**
   * 
    "name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
    "price": "$49.99",
    "body_location": "Wrist",
    "category": "Fitness",
    "_id": 6543,
    "imageSrc": 
    "numInStock": 9,
    "companyId": 19962
   */
  return (
    <ItemDetailsWrapper>
      <Wrapper>
        <img src={items[0].imageSrc} alt={items[0].name} srcset="" />
        <Right>
          <TitleWrapper>
            <h3>{items[0].name}</h3>
            <span>id: {items[0]._id}</span>
          </TitleWrapper>
          <DetailsWrapper>
            <span>category: {items[0].category}</span>
            <span>body location: {items[0].body_location}</span>
            <span>made by: {items[0].companyId}</span>
          </DetailsWrapper>
          <StockWrapper>
            <button>{items[0].price} - </button>
            <span>In Stock : {items[0].numInStock}</span>
          </StockWrapper>
        </Right>
      </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
`;

const Left = styled.div``;
const Right = styled.div`
  height: 175px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TitleWrapper = styled.div``;

const DetailsWrapper = styled.div``;

const StockWrapper = styled.div``;

export default ItemDetails;
