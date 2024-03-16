import { redirect, useLoaderData } from "react-router-dom";
import { logoutUser } from "../user/userSlice";
import store from "../../../store";
import requireAuth from "../../utils/requireAuth";
// import requireAuth from "../../utils/requireAuth";

export function Poll() {
  const { polls } = useLoaderData();
  return (
    <>
      <h1 className="text-6xl">All Polls 🟢</h1>
      {polls.map((poll) => {
        return <div className="text-lg">{poll.title}</div>;
      })}
    </>
  );
}

export async function pollLoader({ request }) {
  requireAuth(request);
  const res = await fetch("http://127.0.0.1:3000/poll", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    store.dispatch(logoutUser());
    throw redirect("/login?redirectTo=/poll");
  }

  const data = await res.json();
  return data;
}
