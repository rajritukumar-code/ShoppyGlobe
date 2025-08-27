import { createSlice } from "@reduxjs/toolkit";

// Initial state for cart
const initialState = {
  orders: [],
};

// Creating orders slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    addOrder(state, action) {
      state.orders.unshift(action.payload);
    },
    clearOrders(state) {
      state.orders = [];
    },
  },
});

// Exporting actions for using in components and reducer to add to the store
export const { setOrders, addOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
