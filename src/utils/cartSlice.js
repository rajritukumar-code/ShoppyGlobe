import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Creating the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adding new item to cart and increment on existing item
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      state.totalQuantity += 1;
      state.totalPrice += item.price;
    },

    // Removing item from cart with id
    removeFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === itemId);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.cartItems = state.cartItems.filter((i) => i.id !== itemId);
      }
    },

    // Updating quantity and price
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === id);
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalPrice +=
          (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
      }
    },
    // Clearing the cart
    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Exporting actions for use in components and  reducer to be added to the store
export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
