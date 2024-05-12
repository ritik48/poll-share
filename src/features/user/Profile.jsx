import { CiBookmarkPlus } from "react-icons/ci";
import { LiaPollSolid } from "react-icons/lia";
import { Link, NavLink, Outlet } from "react-router-dom";

export function Profile() {
  return (
    <div className="gradient bg-white pb-2 pt-8 h-full">
      <div className="fixed bottom-0 top-12 w-[260px] rounded-md  bg-white pt-6">
        <div className="flex flex-col items-center gap-5">
          <img
            className="w-28 rounded-full border bg-[#fedd9b65] p-2"
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
      <div className="w-full space-y-6 rounded-md border h-full border-l-[#cdcccc] bg-[#f9f9f9] px-6 py-4 pl-[270px] ">
        <Outlet />
      </div>
    </div>
  );
}
