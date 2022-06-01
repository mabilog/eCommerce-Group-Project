import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(`/api/get-category/${category}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [category]);

  return <>{category ? <div>{category}</div> : <span>loading</span>}</>;
};

export default Category;
