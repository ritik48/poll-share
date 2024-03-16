import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, loadingSelector } from "../features/user/userSlice";
import { useEffect } from "react";

export default function AppLayout() {
  const loading = useSelector(loadingSelector);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (loading || isLoading)
    return (
      <div className="absolute flex h-full w-full items-center justify-center text-6xl">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
