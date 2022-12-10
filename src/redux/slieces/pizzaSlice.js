import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "loading",
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ currentPage, itemsPerPageLimit, sort, categoryId, searchValue }) => {
    const { data } = await axios.get(
      `https://62a85c0a943591102ba00145.mockapi.io/items?page=${currentPage}&limit=${itemsPerPageLimit}&order=${
        sort.order
      }&sortBy=${sort.sortName}${
        categoryId > 0 ? `&category=${categoryId}` : ``
      }${searchValue ? "&search=" + searchValue : ""}`
    );
    return data;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
