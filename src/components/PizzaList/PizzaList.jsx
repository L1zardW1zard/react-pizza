import React from "react";
import PizzaItem from "../PizzaItem";

import Skeleton from "../PizzaItem/Skeleton";

const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

const PizzaList = ({ items, status }) => {
  return (
    <div className="pizza-list">
      <h2>Все Пиццы</h2>
      <div className="pizza-item-wrapper">
        {status === "loading" ? (
          <>{skeletons}</>
        ) : (
          items.map((pizza) => {
            return <PizzaItem key={"pizza-" + pizza.id} {...pizza} />;
          })
        )}
      </div>
    </div>
  );
};

export default PizzaList;
