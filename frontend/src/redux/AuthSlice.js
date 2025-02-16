// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    RemoveUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, RemoveUser } = AuthSlice.actions;

export default AuthSlice.reducer;
