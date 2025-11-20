import { createSlice } from "@reduxjs/toolkit";

// Boshlang'ich holatni localStorage'dan olish
let storedUser = null;
try {
  const userData = localStorage.getItem("user");
  if (userData) {
    storedUser = JSON.parse(userData);
  }
} catch (err) {
  console.warn("Failed to parse user from localStorage:", err);
  storedUser = null;
}

const initialState = {
  user: storedUser,
  token: localStorage.getItem("token") || null,
  isAuth: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
