import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

const Pagination = ({ onChangePage, totalPageAmount, itemsPerPageLimit }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => {
        onChangePage(e.selected + 1);
      }}
      pageRangeDisplayed={itemsPerPageLimit}
      pageCount={totalPageAmount}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
