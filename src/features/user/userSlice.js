import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.username = action.payload.username;
    },
    logoutUser(state, action) {
      state.name = "";
      state.username = "";
      state.email = "";
    },
  },
});

const userSelector = createSelector(
  (state) => state.user.name,
  (state) => state.user.email,
  (state) => state.user.username,
  (name, email, username) => {
    return { name, email, username };
  },
);

export const { createUser, logoutUser } = userSlice.actions;
export { userSelector };
export default userSlice.reducer;
