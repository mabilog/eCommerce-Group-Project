// ItemCard is the card that will appear on the HomePage component

// TO DO - add clickhandler to CartButton
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const ItemCard = ({item}) => {

  const { itemId } = useParams();

  return (
    <>
      <ItemCardLink to={`/items/${item._id}`}>
        <Wrapper>
        <img src={item.imageSrc}/>
        <Name>{item.name}</Name>
        <Price>{item.price}</Price>
<Divider/>
        <CartButton>Add to Cart</CartButton>
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
margin-left: 100px;
margin-right: 50px;
width: 250px;
max-height: 320px;
margin-bottom: 40px;
margin-top: 0px;
padding: 20px;
box-shadow: 10px 10px 5px #aaaaaa;
border-radius: 7%;
color: black;
border: 0.5px solid lightgrey;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
align-content: center;
margin: auto;
`

const Name = styled.div`
font-size: 16px;
font-weight: 400;
padding-top: 5px;
`

const Price = styled.div`
font-size: 16px;
font-weight: 900;
padding-top: 5px;
`

const Divider = styled.hr`
  color: lightgrey;
  background-color: black;
  height: 2px;
  width: 150px;
  border: 1px transparent;
  border-radius: 10%;
`;

const CartButton = styled.button`
width: 120px;
height: 40px;
border: 0px;
color: white;
background-color: black;
font-weight: 900;
font-family: Lato;
font-size: 14px;
`

export default ItemCard;
