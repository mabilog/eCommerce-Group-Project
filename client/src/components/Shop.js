import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import ListingGrid from "./ListingGrid";
const Shop = () => {
  const { items } = useContext(GlobalContext);
  return <ListingGrid items={items} />;
};

export default Shop;
