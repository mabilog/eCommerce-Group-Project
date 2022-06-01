import styled from "styled-components";
import HeaderImg from "./HeaderImg";

import Categories from "./Categories";
const Home = () => {
  return (
    <HomeWrapper>
      <HeaderImg />
      <Categories />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Home;
