import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import { Hero } from "./App.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import { Login, loginAction } from "./features/user/Login.jsx";
import store from "../store.js";
import { Poll, pollLoader } from "./features/poll/Poll.jsx";
import { useCurrentUser } from "./hooks/useCurrentUser.js";
import requireAuth from "./utils/requireAuth.js";

function PersistRoute() {
  const { loading } = useCurrentUser();
  console.log("Persist render");

  // TODO: return spinner
  if (loading) {
    return null;
  }
  return <Outlet />;
}

function Secret() {
  return <h1 className="text-center text-6xl">Secret Route</h1>;
}

function secretLoader({ request }) {
  requireAuth(request);

  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PersistRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Hero />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
