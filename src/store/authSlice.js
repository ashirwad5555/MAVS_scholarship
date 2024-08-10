import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
//   role: "user", //added role for admin
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
    //   // Assuming the role is stored in the session data        //set the role variable admin or not ?
    //   // Ensure that role is derived from action.payload
    //   const labels = action.payload.labels || [];
    //   state.role = labels.includes("admin") ? "admin" : "user";
      state.userData = action.payload.userData;
    //   console.log(role);
    },
    logout: (state) => {
      state.status = false;
    //   state.role = null;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
