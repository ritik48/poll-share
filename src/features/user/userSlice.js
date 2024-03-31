import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
    },
    logoutUser(state, action) {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    loadingUser(state, action) {
      state.isLoading = true;
    },
  },
});

function fetchCurrentUser() {
  return async function (dispatch, getState) {
    dispatch({ type: "user/loadingUser" });
    const res = await fetch("http://127.0.0.1:3000/getUser", {
      credentials: "include",
    }); 

    if (!res.ok) {
      dispatch({ type: "user/logoutUser" });
    } else {
      const data = await res.json();
      dispatch({ type: "user/createUser", payload: data.user });
    }
  };
}

const userSelector = createSelector(
  (state) => state.user.user?.name,
  (state) => state.user.user?.email,
  (state) => state.user.user?.username,
  (name, email, username) => {
    return { name, email, username };
  },
);

const loadingSelector = (state) => state.user.isLoading;

export const { createUser, logoutUser } = userSlice.actions;
export { userSelector, fetchCurrentUser, loadingSelector };
export default userSlice.reducer;
