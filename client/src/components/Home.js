// import styled from "styled-components";
import ListingGrid from "./ListingGrid";
//import {items} from "../data/items"
import { useEffect, useState } from "react";
import HeaderImg from "./HeaderImg";

const Home = (props) => {
  // const [items, setItems] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   fetch("/api/get-items")
  //     .then((res) => res.json())
  //     .then((itemsDataObj) => {
  //       setItems(itemsDataObj.data);
  //       setIsLoaded(true);
  //     });
  // }, []);

  return (
    <>
      <HeaderImg />
      <ListingGrid />
      {/* {isLoaded && <ListingGrid itemList={Object.values(items)} />} */}
    </>
  );
};

export default Home;
