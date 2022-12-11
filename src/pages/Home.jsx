import React from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { setCategoryId, setCurrentPage, setFilters } from "../redux/slieces/filterSlice";

import { fetchPizzas } from "../redux/slieces/pizzaSlice";

import Categories from "../components/Categories";
import Sort, { sortTypes } from "../components/Sort";
import PizzaList from "../components/PizzaList/PizzaList";
import Pagination from "../components/Pagination";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsPerPageLimit = 4;
  const hasQuery = React.useRef(false);

  const { categoryId, currentPage, sort, searchValue } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);
  const categoriesTypes = ["Все", "Мясные", "Гриль", "Острые", "Закрытые"];

  const fetchData = async () => {
    dispatch(
      fetchPizzas({
        currentPage,
        itemsPerPageLimit,
        sort,
        categoryId,
        searchValue,
      })
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortTypes.find((obj) => obj.sortName === params.sortName && obj.order === params.order);
      dispatch(setFilters({ ...params, sort }));
      hasQuery.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!hasQuery.current) {
      fetchData();
    }
    hasQuery.current = false;
  }, [sort, searchValue, currentPage, categoryId]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortName: sort.sortName,
      order: sort.order,
      categoryId,
      currentPage,
    });
    navigate("?" + queryString);
  }, [sort, categoryId, currentPage, navigate]);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <>
      <div className="content-top">
        <Categories index={categoryId} setIndex={onClickCategory} categoriesTypes={categoriesTypes} />
        <Sort />
      </div>
      {status === "error" ? (
        <div className="pizza-not-found-wrapper">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить пиццы 🤔</p>
        </div>
      ) : items !== [] ? (
        <PizzaList items={items} status={status} />
      ) : (
        <div className="pizza-not-found-wrapper">
          <h2>Произошла ошибка</h2>
          <p>Не удалось найти пиццы </p>
        </div>
      )}

      <Pagination onChangePage={onChangePage} totalPageAmount={3} itemsPerPageLimit={itemsPerPageLimit} />
    </>
  );
};

export default Home;
