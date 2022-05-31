import styled from "styled-components";

const SearchBar = () => {
  return (
    <>
      <div>
        <Input type="text" placeholder="Search"></Input>
        <Button>Search</Button>
      </div>
    </>
  );
};

const Input = styled.input`
  width: 500px;
  height: 20px;
`;
const Button = styled.button``;

export default SearchBar;
