// import Logo from "./Logo";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <Wrapper>
          <LogoWrapper to="/">
            <h1>Dream Team Wearables</h1>
          </LogoWrapper>

          <SearchBar />
          <div>
            <div>Login</div>
            <NavLinks to="/cart/:orderid">Cart</NavLinks>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  align-items: center;
  height: 50px;
  margin: 0px;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  box-shadow: 0px 5px 16px -5px rgba(0, 0, 0, 0.5);
`;
const NavLinks = styled(NavLink)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
const LogoWrapper = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

/* Need to add some top padding to the page content to prevent sudden quick movement //in HOME?  */

export default Header;
