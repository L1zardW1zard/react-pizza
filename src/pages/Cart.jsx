import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearItems } from "../redux/slieces/cartSlice";

import CartItem from "../components/CartItem";

export default function Cart() {
  const { totalPrice, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onClickClearCart = () => {
    dispatch(clearItems());
  };

  return (
    <>
      <div className="cart-wrapper">
        <div className="cart-top">
          <h1>Корзина</h1>
          <button onClick={onClickClearCart} className="clear-cart-btn">
            Очистить корзину
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-message">Pizza not found</div>
          ) : (
            items.map((item, i) => {
              return <CartItem key={i} {...item} />;
            })
          )}
        </div>
        <div className="cart-bottom">
          <div className="bottom-info-wrapper">
            <p className="pizza-amount">
              Всего пицц: <strong>{items.length}шт</strong>
            </p>
            <p className="total-amount">
              Сумма заказа: <strong>{totalPrice}₴</strong>
            </p>
          </div>
          <div className="bottom-buttons">
            <button className="back-btn">
              <Link to="/react-pizza">&#10092; Назад</Link>
            </button>
            <button className="pay-btn">Опалатить &#10093;</button>
          </div>
        </div>
      </div>
    </>
  );
}
