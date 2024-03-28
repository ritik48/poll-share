import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, userSelector } from "../features/user/userSlice";

export default function Header() {
  const { username } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch("http://127.0.0.1:3000/logout", {
      credentials: "include",
    });

    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <div className="border absolute inset-x-0 px-4 py-4 sm:px-10 sm:py-2">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to={"/"} className="text-2xl font-bold">
          Poll s.
        </Link>
        <div className="hidden items-start gap-10 sm:flex">
          <Link
            to={"/poll"}
            className="font-semibold text-[#464646] underline-offset-2 hover:underline"
          >
            Discover
          </Link>
          <Link
            to={"/secret"}
            className="font-semibold text-[#464646] underline-offset-2 hover:underline"
          >
            Create
          </Link>
        </div>
        {!username && (
          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="rounded-md bg-[#ff5e2e] px-4 py-1.5 text-sm font-semibold text-[#fffbf3] duration-300 hover:bg-[#d25028] sm:text-lg"
            >
              Login
            </Link>
            <button className="rounded-md border border-[#2d2b2a] px-4 py-1.5 text-sm font-semibold transition-all duration-300 hover:bg-[#2d2b2a] hover:text-white sm:text-lg ">
              Sign up
            </button>
          </div>
        )}

        {username && (
          <div className="flex items-center gap-6">
            <img
              alt="user"
              src="/assets/bg-images/user.png"
              className="w-11 rounded-full border border-stone-500 p-1"
            />
            <button
              onClick={handleLogout}
              className="rounded-md border border-[#2d2b2a] px-4 py-1.5 text-sm font-semibold transition-all duration-300 hover:bg-[#2d2b2a] hover:text-white sm:text-lg "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
