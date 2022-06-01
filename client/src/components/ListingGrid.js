import styled from "styled-components";
import ItemCard from "./ItemCard";

const ListingGrid = ({ items }) => {
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
  margin-left: 90px;
  margin-right: 90px;
  margin-top: 50px;
`;

export default ListingGrid;
