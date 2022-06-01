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
  margin: 20px auto;
`;

export default ListingGrid;
