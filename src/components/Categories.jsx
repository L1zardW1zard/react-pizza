import React from "react";

const Categories = ({ index, setIndex, categoriesTypes }) => {
  return (
    <div className="categoties">
      <ul>
        {categoriesTypes.map((elem, i) => {
          return (
            <li
              key={i}
              className={index === i ? "active" : ""}
              onClick={() => setIndex(i)}
            >
              {elem}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
