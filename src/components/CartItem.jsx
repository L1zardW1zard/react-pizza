import React from "react";
import { useDispatch } from "react-redux";

import { addItem, removeOneItem } from "../redux/slieces/cartSlice";

export default function CartItem({ id, imageUrl, price, title, type, size, amount }) {
  const dispatch = useDispatch();
  const item = { id, imageUrl, price, title, type, size };

  const onClickAddOne = () => {
    dispatch(addItem(item));
  };

  const onClickRemoveOne = () => {
    //const item = { id, imageUrl, price, title, type, size };
    dispatch(removeOneItem(item));
  };

  return (
    <>
      <div className="cart-item">
        <div className="cart-item-info">
          <img src={imageUrl} alt="" />
          <div className="cart-item-text">
            <h3>{title}</h3>
            <p>
              {type} тесто, {size}см
            </p>
          </div>
        </div>
        <div className="amount-buttons">
          <button onClick={onClickRemoveOne}>-</button>
          <span>{amount}</span>
          <button onClick={onClickAddOne}>+</button>
        </div>
        <div className="item-price">
          <h3>{price}₴ / шт</h3>
        </div>
        <div>
          <button className="remove-item-btn">&#10006;</button>
        </div>
      </div>
    </>
  );
}
