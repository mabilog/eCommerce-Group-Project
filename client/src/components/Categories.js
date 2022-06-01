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
                <ShopCategory to={`/category/${category}`}>
                  Shop {category}
                </ShopCategory>
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
  padding: 20px;
  width: 100%;
`;
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
`;

const ShopCategory = styled(NavLink)`
  cursor: pointer;
`;
export default Categories;
