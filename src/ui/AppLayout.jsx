import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import { loadingSelector } from "../features/user/userSlice";
import { useEffect } from "react";
import requireAuth from "../utils/requireAuth";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AppLayout() {
  const loading = useSelector(loadingSelector);

  useEffect(() => {
    async function fetchCurrentUser() {
      await requireAuth(null, false);
    }
    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="absolute flex h-full w-full items-center justify-center text-6xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
}
