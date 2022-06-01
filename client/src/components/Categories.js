import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const Categories = () => {
  const { categories } = useContext(GlobalContext);
  console.log(categories);
  return (
    <div>
      {categories ? (
        <CategoriesWrapper>
          {categories.map((category) => {
            return (
              <CategoryCard key={category}>
                <span>{category}</span>
                <ShopCategory to={`/category/${category}`}>Shop</ShopCategory>
              </CategoryCard>
            );
          })}
        </CategoriesWrapper>
      ) : null}
    </div>
  );
};

const CategoriesWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-row-gap: 1em;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px 0;
  width: 100%;
  height: 100%;
`;
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
  background-color: #ddd;
  border-radius: 10px;
  span {
    font-size: 26px;
  }
`;

const ShopCategory = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  background-color: var(--primary-color);
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
`;
export default Categories;
