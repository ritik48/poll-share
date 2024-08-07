import { Link } from "react-router-dom";
import { TrendingPoll } from "../features/poll/TrendingPoll";

export default function Polls({ polls }) {
  return (
    <div className="pb-10 sm:pb-20 sm:pt-10">
      <div id="polls" className="mx-auto flex max-w-6xl flex-col gap-10 px-4">
        <h1 className="my-10 text-center text-3xl font-extrabold md:text-5xl">
          Explore these{" "}
          <span className="border-8 border-x-0 border-t-0 border-dashed border-[#ff5f2eca]">
            trending polls
          </span>{" "}
          🚀
        </h1>
        <div className="flex flex-col gap-2 md:flex-row">
          {polls?.polls?.map((poll) => (
            <TrendingPoll key={poll._id} poll={poll} />
          ))}
        </div>
        <Link
          to={"/discover"}
          className="text-semibold my-2  self-start rounded-md bg-[#f25b2dca] px-4 py-2 text-lg text-white hover:bg-[#ff5f2eca]"
        >
          Discover Polls
        </Link>
      </div>
    </div>
  );
}
