import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingGrid from "./ListingGrid";
import styled from "styled-components";

const Category = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`/api/get-category/${category}`)
      .then((res) => res.json())
      .then((data) => setItems(data.data));
  }, [category]);

  return <>
  {category ? <><Header>{category} Wearables</Header>
  <ListingGrid items={items} /></> : <span>loading</span>}</>;
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
export default Category;
