import { CiBookmarkPlus } from "react-icons/ci";
import { LiaPollSolid } from "react-icons/lia";
import { MdDashboardCustomize } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

export function Profile() {
  return (
    <div className="mt-[50px] grid grid-cols-[260px_1fr]">
      <div className="border border-t-0 border-r-[#cdcccc] pt-10">
        <div className="flex flex-col items-center gap-5">
          <img
            className="w-20 rounded-full border bg-[#fedd9b65] p-2"
            src="/assets/bg-images/user.png"
            alt="user"
          />
          <div className="text-2xl font-extrabold">Ritik Raj</div>
          <div className="text-[#464646]">#ritik48</div>
          <div className="text-[#464646]">✉️ raj769417@gmail.com</div>
          <button className="text-x mt-2 w-fit rounded-md border border-[#ff5e2e] px-4 py-1 transition-all duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white">
            Edit Profile
          </button>
        </div>

        <NavLink
          to={"dashboard"}
          className="mt-4 flex w-full gap-6 border border-t-0 py-2 pl-4 hover:bg-[#e5e4e4]"
        >
          <MdDashboardCustomize size={20} />
          <div>Dashboard</div>
        </NavLink>
        <NavLink
          to={"polls"}
          className="flex w-full gap-6 border border-t-0 py-2 pl-4 hover:bg-[#e5e4e4]"
        >
          <LiaPollSolid size={20} />
          <div>My Polls</div>
        </NavLink>
        <NavLink
          to={"votes"}
          className="flex w-full gap-6 border border-t-0 py-2 pl-4 hover:bg-[#e5e4e4]"
        >
          {/* <LiaPollSolid size={25} /> */}
          {/* <SiTicktick size={25} /> */}
          <CiBookmarkPlus size={20} />
          <div>My Votes</div>
        </NavLink>
      </div>
      <div className="overflow-y-scroll">
        <div className="h-[calc(100vh-50px)] w-full bg-[#f9f9f9]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
