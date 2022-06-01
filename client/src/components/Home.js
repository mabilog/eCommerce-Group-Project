// import styled from "styled-components";
import ListingGrid from "./ListingGrid";
//import {items} from "../data/items"
import { useContext } from "react";
import HeaderImg from "./HeaderImg";
import { GlobalContext } from "./GlobalContext";

const Home = () => {
  const { items } = useContext(GlobalContext);

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
      <ListingGrid items={items} />
      {/* {isLoaded && <ListingGrid itemList={Object.values(items)} />} */}
    </>
  );
};

export default Home;
