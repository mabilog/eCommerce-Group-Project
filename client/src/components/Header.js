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
            <div>Categories</div>
            <Dropdown>
              <DropdownContent>
                <ShopAll to="/shop">All Products</ShopAll>
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
            <NavLinks to="/cart">
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
  padding-left: 40px;
  padding-right: 40px;
  align-items: center;
  height: 50px;
  margin: 0px;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  box-shadow: 0px 5px 16px -5px rgba(0, 0, 0, 0.5);
  z-index: 100;
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
  padding-left: 30px;
  width: 165px;
  font-size: 18px;
  z-index: 100;
  &:hover > div {
    display: block;
    z-index: 99;
  }
`;

const ShopAll = styled(NavLink)`
  /* background-color: #f44334; */
  text-decoration: none;
  color: #000;
  z-index: 99;
  &:hover {
    font-weight: bold;
  }
`;
const CatLink = styled(Link)`
  text-decoration: none;
  color: #000;
  z-index: 99;
  &:hover {
    font-weight: bold;
  }
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
  opacity: 0.9;
  padding: 20px;
  gap: 10px;
  z-index: 10;
`;
/* Need to add some top padding to the page content to prevent sudden quick movement //in HOME?  */

export default Header;
