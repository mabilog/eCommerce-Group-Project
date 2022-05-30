import Logo from "./Logo";
import Cart from "./Cart";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <Wrapper>
          <Logo />
          <h1>Dream Team Wearables</h1>
          <div>
            <div>Login</div>
            <NavLink to="/cart/:orderid">Cart</NavLink>
          </div>
        </Wrapper>
      </div>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-height: 75px;
  margin: 0px;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  box-shadow: 0px 5px 16px -5px rgba(0, 0, 0, 0.5);
`;
/* Need to add some top padding to the page content to prevent sudden quick movement //in HOME?  */

export default Header;
