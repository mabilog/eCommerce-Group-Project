import styled from "styled-components";
import ListingGrid from "./ListingGrid";
//import {items} from "../data/items"
import { useEffect, useState } from "react";
import HeaderImg from "./HeaderImg";

const Home = (props) => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/get-items")
      .then((res) => res.json())
      .then((itemsDataObj) => {
        console.log(
          "got res object from backend & assign it to variable itemsDataObj:",
          itemsDataObj
        );
        console.log(
          "then assign res object data property(array) to variable items at frontend ",
          itemsDataObj.data
        );
        setItems(itemsDataObj.data);
        setIsLoaded(true);
      });
  }, []);

  return (
    <>
      <HeaderImg />
      {isLoaded && (
        <>
          <ListingGrid itemList={Object.values(items)} />
        </>
      )}
    </>
  );
};

export default Home;
