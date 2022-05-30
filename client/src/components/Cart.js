import { items } from "../data/items";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Cart = () => {
  return (
    <>
      <h3>Cart</h3>
      <div>
        {items.slice(0, 2).map((item) => {
          console.log(item);
          return (
            <div key={item._id}>
              {/* link only on image to return to item detail? */}
              <Link to={`/items/${item._id}`}>
                <img src={item.imageSrc} alt={item.name} />
              </Link>
              <div>{item.name}</div>
              <button>+</button>
              <div># of articles </div>
              <button>-</button>
              <button>delete</button>
              <div>{item.price}</div>
              <div>total</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cart;
