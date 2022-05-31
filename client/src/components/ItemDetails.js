import styled from "styled-components";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react'

const ItemDetails = () => {

  const { itemId } = useParams();

  const [ item, setItem] = useState([]);
  const [ company, setCompany] = useState();
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    fetch(`/api/get-items/${itemId}`)
    .then((res) => res.json())
    .then((itemDataObj) => {
      // console.log("got res object from backend & assign it to variable itemsDataObj:", itemDataObj)
      // console.log("then assign res object data property(array) to variable items at frontend ", itemDataObj.data)
      setItem(itemDataObj.data)
      console.log("Hello", item);
      setIsLoaded(true)
    });

  },[]);

    // Note: the company data doesn't always work. It might be the mount / unmount issue. 
  useEffect(() => {
    fetch(`/api/get-companies/${item.companyId}`)  
    .then((res) => res.json())
    .then((companyDataObj) => {
     // console.log("got res object from backend & assign it to variable companyDataObj:", companyDataObj);
      console.log("then assign res object to variable company at frontend ", companyDataObj.data);
      setCompany(companyDataObj.data);
      setIsLoaded(true);

    });

  },[]);


  console.log("AAAAAAA", item.companyId, company);


  return (    
    <>
      {isLoaded &&
       <>
         <ItemDetailsWrapper>
            <Wrapper>
              <img src={item.imageSrc} alt={item.name} srcset="" />
              <Right>
                <TitleWrapper>
                  <h3>{item.name}</h3>
                  <span>Item ID: {item._id}</span>
                </TitleWrapper>
                <StockWrapper>{item.numInStock <= 0 ? <OOSButton>Out of stock</OOSButton> : 
                <div><CartButton>{item.price} - Add to Cart</CartButton> 
                <div>{item.numInStock} items in stock</div></div>}
                </StockWrapper>
                <DetailsWrapper>
                  <span>Category: {item.category}</span>
                  <span>Body Location: {item.body_location}</span>
                  <span>Made By: {item.companyId}</span>
                  {/* <span>made by: {company.name}</span> */}
                </DetailsWrapper>
              </Right>
            </Wrapper>
         </ItemDetailsWrapper>
       </>
      }
   </>
 )

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
  background-color: white;
  border-radius: 10px;
  max-width: 550px;
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
  text-align: center;
  line-height: 20px;
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
  text-align: center;
  line-height: 30px;
  `;

  const CartButton = styled.button`
    padding: 15px 40px;
    border: none;
    border-radius: 10px;
    background-color: var(--primary-color);
    font-family: Jost;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const OOSButton = styled.button`
padding: 15px 40px;
    border: none;
    border-radius: 10px;
    color: grey;
    background-color: lightgrey;
    font-family: Jost;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
`

export default ItemDetails;