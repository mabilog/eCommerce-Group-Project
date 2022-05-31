import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const Sidebar = ()=>{

    return (
        <StyledSidebar> 
            <Filter>Shop by</Filter>         
            <NavigationLink to="/">Category</NavigationLink>
            <NavigationLink to="/">Company</NavigationLink>
            <NavigationLink to="/">Body Location</NavigationLink>
            <NavigationLink to="/">A-Z</NavigationLink>
        </StyledSidebar>        
    );
};

const StyledSidebar = styled.div`

  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem;
`;

const Filter = styled.div`
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin-top: 100px;
  margin-left: 10px;
`;

const NavigationLink = styled(NavLink)`
    background-color: lightblue;
    width: fit-content;
    font-size: 1.2rem;
    color: black;
    border-radius: 1rem;
    display: block;
    padding: 0.5rem;
    text-decoration: none;

    &.active{
        color: black;
    }
    &:hover{
        background-color: lightgreen;
    }
    &:first-of-type{
        margin-top: 2rem;
    }
`;

export default Sidebar;


