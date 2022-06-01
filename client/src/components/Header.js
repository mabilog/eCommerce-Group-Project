import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineShopping } from "react-icons/ai";

const Header = () => {
  const { cartItems, categories } = useContext(GlobalContext);
  return (
    <>
      <div>
        <Wrapper>
          <LogoWrapper to="/">
            <h1>Dream Team Wearables</h1>
          </LogoWrapper>
          <DropdownWrapper>
            <ShopAll to="/shop">Shop</ShopAll>
            <Dropdown>
              <DropdownContent>
                {categories?.map((category) => {
                  return (
                    <CatLink to={`/category/${category}`} key={category}>
                      {category}
                    </CatLink>
                  );
                })}
              </DropdownContent>
            </Dropdown>
          </DropdownWrapper>
          <SearchBar />
          <Right>
            <div>Login</div>
            <NavLinks to="/cart/:orderid">
              <AiOutlineShopping />
              <span>{cartItems.length}</span>
            </NavLinks>
          </Right>
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
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 26px;
  span {
    font-size: 16px;
  }
`;
const LogoWrapper = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  font-size: 20px;
  z-index: 10;
  &:hover > div {
    display: block;
  }
`;

const ShopAll = styled(NavLink)`
  /* background-color: #f44334; */
  text-decoration: none;
  color: #000;
`;
const CatLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;
const Dropdown = styled.div`
  display: none;
  position: absolute;
  /* height: 100px; */
`;
const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  gap: 10px;
`;
/* Need to add some top padding to the page content to prevent sudden quick movement //in HOME?  */

export default Header;
