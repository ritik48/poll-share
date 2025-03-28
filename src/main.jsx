import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import AppLayout from "./ui/AppLayout.jsx";
import { Login, loginAction } from "./features/user/Login.jsx";
import store from "./redux/store.js";
import { Poll, pollAction, pollLoader } from "./features/poll/Poll.jsx";

import Home from "./ui/Home.jsx";
import { Signup, signupAction } from "./features/user/Signup.jsx";
import { Create, createPollAction } from "./features/poll/Create.jsx";
import { UserPolls } from "./features/user/UserPolls.jsx";
import { Profile } from "./features/user/Profile.jsx";
import { Votes } from "./features/user/Votes.jsx";
import { Dashboard, dashboardLoader } from "./features/user/Dashboard.jsx";
import { DiscoverPolls } from "./features/poll/Discover.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/discover",
        element: <DiscoverPolls />,
      },
      {
        path: "/account",
        element: <Profile />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            loader: dashboardLoader,
          },
          {
            path: "polls",
            element: <UserPolls />,
          },
          {
            path: "votes",
            element: <Votes />,
          },
        ],
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
