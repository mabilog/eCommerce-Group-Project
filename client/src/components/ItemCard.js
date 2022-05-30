import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const ItemCard = ({item}) => {

  const onMouseEnterHandler = (e) => {
    e.target.style.transform = "scale(1.06)";
  };

  const onMouseLeaveHandler = (e) => {
    e.target.style.transform = "scale(1)";
  };

  const { itemId } = useParams();

  return (
    <>
      <ItemCardLink to={`/items/${item._id}`}>
        <Wrapper>
        <ItemImg onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} src={item.imageSrc}/>
        <Name>{item.name}</Name>
        <Price>{item.price}</Price>
<Divider/>
{item.numInStock <= 0 ?
        <OOSButton>Out of stock</OOSButton>
:
        <CartButton>Add to Cart</CartButton>
}
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
margin: auto;
width: 290px;
height: 320px;
margin-bottom: 40px;
margin-top: 0px;
padding: 20px;
/* box-shadow: 10px 10px 5px var(--primary-color); */
border-radius: 7%;
color: #000000;
background-color: #FFFFFF;
line-height: 20px;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
align-content: center;
margin: auto;
`

const ItemImg = styled.img`
margin-bottom: 10px;
max-height: 150px;
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

const CartButton = styled.button`
width: 120px;
height: 40px;
border: 0px;
color: white;
background-color: var(--primary-color);
border-radius: 10px;
font-weight: 900;
font-family: 'Jost';
font-size: 14px;
`
const OOSButton = styled.button`
width: 120px;
height: 40px;
border: 0px;
color: grey;
background-color: lightgrey;
border-radius: 10px;
font-weight: 900;
font-family: 'Jost';
font-size: 14px;
`
export default ItemCard;