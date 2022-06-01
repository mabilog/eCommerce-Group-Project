import { useContext } from "react";
import styled from "styled-components";
import ItemCard from "./ItemCard";

import { GlobalContext } from "./GlobalContext";
const ListingGrid = () => {
  const { items } = useContext(GlobalContext);
  return (
    <Wrapper>
      {items?.map((item) => {
        return <ItemCard key={item._id} item={item} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 100px;
  margin-right: 100px;
`;

export default ListingGrid;
