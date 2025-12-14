import { createSlice } from "@reduxjs/toolkit";

let storedUser = null;
try {
  const userData = localStorage.getItem("user");
  if (userData) storedUser = JSON.parse(userData);
} catch {}

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
