import Countdown from "react-countdown";
import { GrFormNextLink } from "react-icons/gr";
import { Link } from "react-router-dom";

export function TrendingPoll({ poll }) {
  return (
    <div
      className="w-full cursor-pointer rounded-2xl border-2 border-gray-200 bg-[#fffbfb] p-4 shadow-md shadow-[#838383ca] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#ff5f2eca] md:w-1/2"
      key={poll._id}
    >
      <div className="mb-1 flex items-center gap-5">
        <img
          className="h-5 w-5 rounded-full bg-blue-500 object-cover shadow-md sm:h-10 sm:w-10"
          src={`${poll.user.avatar}`}
          alt="user"
        />
        <div className="text-sm text-[#383737] sm:text-xl">
          {poll.user.name}
        </div>
        <div className="ml-auto text-sm text-gray-600 sm:text-base">3h ago</div>
      </div>
      <div className="mt-4 text-xl font-semibold sm:text-2xl">{poll.title}</div>
      <div className="mt-2 flex items-center gap-4">
        <span className="text-xl font-light text-red-500 sm:text-2xl">
          Closes in:{" "}
        </span>
        <div className="text-xl font-light tracking-widest text-red-500 sm:text-2xl">
          <Countdown date={new Date(poll.expiresAt).getTime()} />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 text-gray-500">
        <span className="text-semibold text-sm sm:text-base">Category</span>
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-semibold rounded-xl border px-2 py-1.5 text-sm sm:border-2 sm:text-base">
              Tech
            </span>
            <span className="text-semibold rounded-xl border px-2 py-1.5 text-sm sm:border-2 sm:text-base">
              Web development
            </span>
          </div>
          <div className="my-2 flex items-center gap-10 text-sm font-bold text-green-600 sm:my-0 sm:text-lg">
            <div>+1750 votes</div>
            <div>+2545 views</div>
          </div>
        </div>
      </div>
      <div className="mt-1 flex items-center gap-2">
        <Link
          to={`/poll/${poll._id}`}
          className="ml-auto rounded-md border border-[#c4c4c4] px-2 transition-all duration-300 hover:bg-[#222121] hover:text-[#d0cfcf] "
        >
          <GrFormNextLink size={25} />
        </Link>
      </div>
    </div>
  );
}
