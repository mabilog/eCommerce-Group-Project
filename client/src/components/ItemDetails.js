import styled from "styled-components";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

const ItemDetails = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState();
  const [company, setCompany] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const { cartItems, setCartItems } = useContext(GlobalContext);

  useEffect(() => {
    fetch(`/api/get-items/${itemId}`)
      .then((res) => res.json())
      .then((itemDataObj) => {
        setItem(itemDataObj.data);
      });
  }, [itemId]);

  useEffect(() => {
    if (item)
      fetch(`/api/get-companies/${item.companyId}`)
        .then((res) => res.json())
        .then((companyDataObj) => {
          setCompany(companyDataObj.data);
          setIsLoaded(true);
        });
  }, [item]);

  const addToCart = (_id, e) => {
    e.preventDefault();
    console.log(_id);
    if (!cartItems.includes(_id))
      setCartItems([...cartItems, { _id, quantity: 1 }]);
  };

  return (
    <>
      {isLoaded && (
        <>
          <ItemDetailsWrapper>
            <Wrapper>
              <img src={item.imageSrc} alt={item.name} srcSet="" />
              <Right>
                <TitleWrapper>
                  <h3>{item.name}</h3>
                  <span>Item ID: {item._id}</span>
                </TitleWrapper>
                <StockWrapper>
                  {item.numInStock <= 0 ? (
                    <OOSButton>Out of stock</OOSButton>
                  ) : (
                    <div>
                      {cartItems.find((i) => i._id === item.id) ? (
                        <CartButton disabled>Added to Cart!</CartButton>
                      ) : (
                        <CartButton onClick={(e) => addToCart(item._id, e)}>
                          {item.price} - Add to Cart
                        </CartButton>
                      )}

                      <div>{item.numInStock} items in stock</div>
                    </div>
                  )}
                </StockWrapper>
                <DetailsWrapper>
                  <span>Category: {item.category}</span>
                  <span>Body Location: {item.body_location}</span>
                  <span>Made By: {company.name}</span>
                </DetailsWrapper>
              </Right>
            </Wrapper>
          </ItemDetailsWrapper>
        </>
      )}
    </>
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
  background-color: white;
  max-width: 550px;
`;

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
  border-radius: 5px;
  background-color: var(--primary-color);
  font-family: Jost;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
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
`;

export default ItemDetails;
