import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingGrid from "./ListingGrid";

const Category = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`/api/get-category/${category}`)
      .then((res) => res.json())
      .then((data) => setItems(data.data));
  }, [category]);

  return <>{category ? <ListingGrid items={items} /> : <span>loading</span>}</>;
};

export default Category;
