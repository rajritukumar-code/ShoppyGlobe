import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice"

// Configuring Redux store with cart and orders slices for centralized state management.
const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders:ordersReducer
  },
});

export default store;
