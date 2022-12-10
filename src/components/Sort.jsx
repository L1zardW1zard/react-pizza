import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { FiArrowDown, FiArrowUp } from "react-icons/fi";

import { setSort } from "../redux/slieces/filterSlice";

export const sortTypes = [
  { id: 0, name: "популярности", sortName: "rating", order: "desc" },
  { id: 1, name: "популярности", sortName: "rating", order: "asc" },
  { id: 2, name: "цене", sortName: "price", order: "desc" },
  { id: 3, name: "цене", sortName: "price", order: "asc" },
  { id: 4, name: "алфавиту", sortName: "alphabetic", order: "desc" },
  { id: 5, name: "алфавиту", sortName: "alphabetic", order: "asc" },
];

const Sort = () => {
  const [popUpOpen, setPopUpOpen] = React.useState(false);
  const sort = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();
  const sortRef = React.useRef();

  const onSortTypeClick = (obj) => {
    dispatch(setSort(obj));
    setPopUpOpen(false);
  };

  React.useEffect(() => {
    const outsideClickHandler = (e) => {
      if (!e.composedPath().includes(sortRef.current)) setPopUpOpen(false);
    };

    document.body.addEventListener("click", outsideClickHandler);
    return () => {
      document.body.removeEventListener("click", outsideClickHandler);
    };
  });

  return (
    <div className="sort" ref={sortRef}>
      <div
        className="sort-label"
        onClick={() => {
          setPopUpOpen(!popUpOpen);
        }}
      >
        <b>Сортировка по:&nbsp;</b>
        <span>{sortTypes ? sort.name : "noSortTypes"}</span>
      </div>
      {popUpOpen && (
        <div className="sort-popup">
          <ul>
            {sortTypes.map((obj, i) => {
              const arrow = obj.order === "asc" ? <FiArrowUp /> : <FiArrowDown />;
              return (
                <li key={i} className={sort.id === i ? "active" : ""} onClick={() => onSortTypeClick(obj)}>
                  {obj.name}
                  {arrow}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
