import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="px-4 py-4 sm:px-10 sm:py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="text-2xl font-bold">Poll s.</div>
        <div className="hidden items-start gap-10 sm:flex">
          <span className="font-semibold text-[#464646]">Discover</span>
          <span className="font-semibold text-[#464646]">Create</span>
        </div>
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
        {/* <div className="flex items-center gap-6">
          <img alt="user" src="/assets/bg-images/user.png" className="w-11 rounded-full border border-stone-500 p-1" />
          <Link className="rounded-md border border-[#2d2b2a] px-4 py-1.5 text-sm font-semibold transition-all duration-300 hover:bg-[#2d2b2a] hover:text-white sm:text-lg ">
            Logout
          </Link>
        </div> */}
      </div>
    </div>
  );
}
