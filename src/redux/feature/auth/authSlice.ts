import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      if (accessToken) {
        Cookies.set("accessToken", accessToken, { expires: 7, secure: true });
      } else {
        Cookies.remove("accessToken");
      }

      if (refreshToken) {
        Cookies.set("refreshToken", refreshToken, { expires: 30, secure: true });
      } else {
        Cookies.remove("refreshToken");
      }
    },
    Logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    },
  },
});

export const { SetUser, Logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;

export default authSlice.reducer;
