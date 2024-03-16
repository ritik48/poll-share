import { Outlet } from "react-router-dom";
import Header from "./Header";
// import { useCurrentUser } from "../hooks/useCurrentUser";

export default function AppLayout() {
  console.log("App layout");
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
