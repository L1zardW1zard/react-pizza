import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addItem } from "../../redux/slieces/cartSlice";

const typeNames = ["Тонкое", "Традиционное"];

const PizzaItem = ({ id, imageUrl, name, types, sizes, price }) => {
  const dispatch = useDispatch();

  const [activeIndexTypes, setActiveIndexTypes] = React.useState(0);
  const [activeIndexSizes, setActiveIndexSizes] = React.useState(0);

  const cartItems = useSelector((state) =>
    state.cart.items.filter((obj) => obj.id === id)
  );

  let addedAmount = 0;

  if (cartItems) {
    cartItems.forEach((el) => (addedAmount += el.amount));
  }

  React.useEffect(() => {}, []);

  const onClickAdd = (e) => {
    const item = {
      id,
      title: name,
      price,
      imageUrl,
      type: typeNames[activeIndexTypes],
      size: sizes[activeIndexSizes],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-item">
      <a href="/">
        <img src={imageUrl} alt="Pizza" />
        <h4>{name}</h4>
      </a>
      <div className="pizza-selector">
        <ul>
          {types.map((elem, i) => {
            return (
              <li
                key={"type" + i}
                onClick={() => setActiveIndexTypes(i)}
                className={activeIndexTypes === i ? "active" : ""}
              >
                {typeNames[elem]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, i) => {
            return (
              <li
                key={i}
                onClick={() => setActiveIndexSizes(i)}
                className={activeIndexSizes === i ? "active" : ""}
              >
                {size}см
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pizza-bottom">
        <div className="pizza-price">от {price} ₴</div>
        <div>
          <button onClick={onClickAdd}>
            <p>
              <b>+ Добавить</b>
              {addedAmount > 0 && <b> {addedAmount}</b>}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
