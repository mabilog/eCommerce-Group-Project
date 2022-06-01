import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import ListingGrid from "./ListingGrid";
import styled from "styled-components";
const Shop = () => {
  const { items } = useContext(GlobalContext);
  return <><Header>All Products</Header><ListingGrid items={items} /></>;
};


const Header = styled.h1`
font-size: 36px;
text-align: center;
padding-top: 40px;
padding-bottom: 20px;
margin-top: 30px;
font-weight: 700;
letter-spacing: 3pt;
text-transform: uppercase;
text-align: center;
color: #BE974C;
`;
export default Shop;
