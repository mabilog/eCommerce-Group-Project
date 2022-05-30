import styled from "styled-components";
import ListingGrid from "./ListingGrid";
import {items} from "../data/items"


const Home = (props) => {
    return (
        <>
<ListingGrid itemList={Object.values(items)} />
        </>
    )
}

export default Home;