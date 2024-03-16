import { redirect } from "react-router-dom";
import store from "../../store";

export default function requireAuth(request) {
  const username = store.getState().user.username;
  const url = new URL(request.url).pathname;

  if (!username) {
    throw redirect(`/login?redirectTo=${url}`);
  }
}
