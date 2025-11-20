import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [], // Savatdagi mahsulotlar arrayi
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🛒 Mahsulotni savatga qo'shish
    addToCart: (state, action) => {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1; // agar mavjud bo'lsa, sonini 1 ga oshiramiz
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    // ➖ Mahsulot sonini kamaytirish
    decreaseQty: (state, action) => {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        // agar quantity 1 dan kam bo'lsa yoki mavjud bo'lmasa, savatdan o'chiramiz
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },

    // ❌ Mahsulotni savatdan o'chirish
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    // 🧹 Savatni tozalash
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Reducer va actions export qilinadi
export const { addToCart, decreaseQty, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
