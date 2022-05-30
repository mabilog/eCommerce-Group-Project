// ItemCard will link to ItemDetails (like in fruit store exercise)
import { useEffect, useContext } from "react";
import styled from "styled-components";

import { items } from "../data/items";
const ItemDetails = () => {
  /**
   * Angelo's notes:
   *
   * I've created just a rought template on what would be relevant to the item details page.
   * Feel free to go and change the styling to your hearts content.
   *
   * It would be wise to fetch information from the back as the component loads.
   * - Taking the URL paramenter and doing a fetch using the item id.
   * - .then assigning it to a local useState and displaying the information when the fetch is complete.
   *
   * I have provided what the fetched data should look like below
   */

  /**
   * 
    "name": "Barska GB12166 Fitness Watch with Heart Rate Monitor",
    "price": "$49.99",
    "body_location": "Wrist",
    "category": "Fitness",
    "_id": 6543,
    "imageSrc": <imageSrc information>
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
            <span>{items[0]._id}</span>
          </TitleWrapper>
          <StockWrapper>
            <button>{items[0].price} - Buy now</button>
            <span>In Stock : {items[0].numInStock}</span>
          </StockWrapper>
          <DetailsWrapper>
            <span>category: {items[0].category}</span>
            <span>body location: {items[0].body_location}</span>
            <span>made by: {items[0].companyId}</span>
          </DetailsWrapper>
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
  gap: 30px;
  padding: 20px;
`;

const Left = styled.div``;
const Right = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;
`;

const TitleWrapper = styled.div`
  max-width: 500px;
  h3 {
    font-weight: 600;
    font-size: 26px;
    line-height: 30px;
    margin-top: 0;
  }
`;

const StockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  button {
    padding: 15px 40px;
    border: none;
    border-radius: 10px;
    background-color: #460fe0;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default ItemDetails;
