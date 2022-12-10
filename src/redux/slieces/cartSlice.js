import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice += action.payload.price;
    // },
    addItem(state, action) {
      const foundItem = state.items.find((obj) => {
        if (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        ) {
          return obj;
        }
      });

      if (foundItem) {
        foundItem.amount++;
      } else {
        state.items.push({
          ...action.payload,
          amount: 1,
        });
      }

      state.totalPrice += action.payload.price;
    },
    // removeItem(state, action) {

    // },
    removeOneItem(state, action) {
      const foundItem = state.items.find((obj) => {
        if (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        ) {
          return obj;
        }
        return null;
      });

      if (foundItem && foundItem.amount > 1) {
        foundItem.amount--;
        state.totalPrice -= foundItem.price;
      } else {
        state.items = state.items.filter((obj) => obj !== foundItem);
        state.totalPrice -= foundItem.price;
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, clearItems, removeOneItem } = cartSlice.actions;

export default cartSlice.reducer;
