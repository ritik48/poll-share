import { redirect } from "react-router-dom";
import store from "../redux/store";
import { fetchCurrentUser } from "../features/user/userSlice";

// Get username from store. If it's null then call fetchCurrentUser, which will hit the endpoint with the cookie, and populate the store
// If still username is null, then just redirect

export default async function requireAuth(request, navigate) {
  let username = store.getState().user.user?.username;

  let url;
  if (request) url = new URL(request.url).pathname;

  if (!username) {
    await store.dispatch(fetchCurrentUser());
    username = store.getState().user.user?.username;

    if (navigate) {
      if (!username) {
        throw redirect(`/login?redirectTo=${url}`);
      }
    }
    return username;
  }
}
