import styled from "styled-components";
import ItemCard from "./ItemCard";

const ListingGrid = ({itemList}) => {
    return (
        <>
        <Wrapper>
          {itemList.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
          </Wrapper>
        </>
      );
    };

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
margin-left: 100px;
margin-right: 100px;
`;

export default ListingGrid;

