// ItemCard is the card that will appear on the HomePage component
// Here, we will map through the data array from MongoDB

import { Link } from "react-router-dom";

const ItemCard = () => {
  return (
      <>
    <Link to={`/items/${item.id}`}>
      <img src=""/>
      <p>Item Name</p>
      <p>Item Category</p>
      <p>Item Price</p>
      <button>Add to Cart</button>
    </Link>
    </>
  );
};


export default ItemCard;