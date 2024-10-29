import { createSlice } from "@reduxjs/toolkit";

const full_name = JSON.parse(localStorage.getItem("full_name"));
const userId = JSON.parse(localStorage.getItem("userId"));
// const role = JSON.parse(localStorage.getItem("role"));

const initialState = {
  isLoggedIn: false,
  full_name: full_name ? full_name : "",
  user: {
    full_name: "",
    email: "",
    // role: "",
  },
  userId: userId ? userId : "",
  // role: role ? role : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload));
      state.full_name = action.payload;
    },
    SET_ID(state, action) {
      localStorage.setItem("id", JSON.stringify(action.payload));
      state.userId = action.payload;
    },
    // SET_ROLE(state, action) {
    //   localStorage.setItem("role", JSON.stringify(action.payload));
    //   state.role = action.payload;
    // },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.full_name = profile.full_name;
      state.user.email = profile.email;
      // state.user.role = profile.role;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER, SET_ID } =
  authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.full_name;
export const selectUser = (state) => state.auth.user;
// export const selectRole = (state) => state.auth.role;
export const selectId = (state) => state.auth.userId;

export default authSlice.reducer;
