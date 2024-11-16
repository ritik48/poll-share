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
    updateVote(state, action) {
      const { poll_id, poll_choice } = action.payload;
      const existingVoteIndex = state.user.vote.findIndex(
        (v) => v.poll_id === poll_id,
      );

      let existingChoice = -1;
      if (existingVoteIndex !== -1) {
        existingChoice = state.user.vote[existingVoteIndex].poll_choice;
      }

      if (existingChoice === parseInt(poll_choice)) {
        state.user.vote.splice(existingVoteIndex, 1);
      } else if (existingVoteIndex !== -1) {
        state.user.vote[existingVoteIndex] = {
          poll_id,
          poll_choice: parseInt(poll_choice),
        };
      } else {
        state.user.vote.push({ poll_id, poll_choice: parseInt(poll_choice) });
      }
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

export const { createUser, logoutUser, updateVote } = userSlice.actions;
export { userSelector, fetchCurrentUser, loadingSelector };
export default userSlice.reducer;
