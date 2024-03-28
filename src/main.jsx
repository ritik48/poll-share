import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import AppLayout from "./ui/AppLayout.jsx";
import { Login, loginAction } from "./features/user/Login.jsx";
import store from "../store.js";
import { Poll, pollLoader } from "./features/poll/Poll.jsx";
import requireAuth from "./utils/requireAuth.js";
import Home, { homeLoader } from "./ui/Home.jsx";

function Secret() {
  return <h1 className="text-center text-6xl">Secret Route</h1>;
}

async function secretLoader({ request }) {
  await requireAuth(request, true);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "poll",
        element: <Poll />,
        loader: pollLoader,
      },
      {
        path: "/secret",
        element: <Secret />,
        loader: secretLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
