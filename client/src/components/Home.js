import styled from "styled-components";
import ListingGrid from "./ListingGrid";
import {items} from "../data/items"
import HeaderImg from "./HeaderImg";


const Home = (props) => {
    return (
        <>
        <HeaderImg/>
<ListingGrid itemList={Object.values(items)} />
        </>
    )
}

export default Home;