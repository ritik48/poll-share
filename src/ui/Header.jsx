import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, userSelector } from "../features/user/userSlice";

export default function Header() {
  const { username, name } = useSelector(userSelector);
  const dispatch = useDispatch();

  async function handleLogout() {
    await fetch("http://127.0.0.1:3000/logout", {
      credentials: "include",
    });

    dispatch(logoutUser());
  }

  return (
    <div className="fixed inset-x-0 z-10 border bg-[#f6f0e0f1] px-4 py-4 sm:px-10 sm:py-1.5">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to={"/"} className="text-md font-bold sm:text-xl">
            Poll s.
          </Link>
          <Link
            to={"/create"}
            className="hidden text-sm text-[#464646] underline-offset-2 hover:underline sm:block sm:text-lg"
          >
            Create
          </Link>
          <Link
            to={"/discover"}
            className="hidden text-sm text-[#464646] underline-offset-2 hover:underline sm:block sm:text-lg"
          >
            Dicover
          </Link>
        </div>
        {!username && (
          <div className="flex items-center gap-2 sm:gap-6">
            <Link
              to="/login"
              className="rounded-md bg-[#ff5e2e] px-4 py-1.5 text-sm font-semibold text-[#fffbf3] duration-300 hover:bg-[#d25028] sm:text-base"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="rounded-md border border-[#2d2b2a] px-2 py-1 text-sm font-semibold transition-all duration-300 hover:bg-[#2d2b2a] hover:text-white sm:text-base"
            >
              Sign up
            </Link>
          </div>
        )}

        {username && (
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="font-semibold">{name}</div>
            <Link to={"account/dashboard"}>
              <img
                alt="user"
                src="/assets/bg-images/user.png"
                className="w-6 rounded-full border border-stone-500 p-1 sm:w-9"
              />
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-md border border-[#2d2b2a] px-2 py-1 text-sm font-semibold transition-all duration-300 hover:bg-[#2d2b2a] hover:text-white sm:text-base"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
