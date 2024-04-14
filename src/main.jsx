import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import AppLayout from "./ui/AppLayout.jsx";
import { Login, loginAction } from "./features/user/Login.jsx";
import store from "../store.js";
import { Poll, pollAction, pollLoader } from "./features/poll/Poll.jsx";

import Home, { homeLoader } from "./ui/Home.jsx";
import { Signup, signupAction } from "./features/user/Signup.jsx";
import { Create, createPollAction } from "./features/poll/Create.jsx";
import { Dashboard } from "./features/user/Dashboard.jsx";

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
        path: "poll/:id",
        element: <Poll />,
        loader: pollLoader,
        action: pollAction,
      },
      {
        path: "/create",
        element: <Create />,
        action: createPollAction,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: homeLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <Signup />,
    action: signupAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
