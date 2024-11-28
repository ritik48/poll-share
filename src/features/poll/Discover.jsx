import { useState } from "react";
import Countdown from "react-countdown";
import { GrFormNextLink } from "react-icons/gr";
import { Link, useLoaderData } from "react-router-dom";
import TimeAgo from "react-timeago";

import bg from "../../assets/Discover/pattern2.svg";
import { useGetPollsQuery, useGetTrendingPollsQuery } from "../../redux/api";
import { TrendingPoll } from "./TrendingPoll";

function timeLeft(publishedAt, expiresAt) {
  const d1 = new Date(publishedAt);
  const d2 = new Date(expiresAt);
  // console.log(d2.getTime() - d1.getTime());
  return d2.getTime();
}

function DiscoverPolls() {
  const [pollStatus, setPollStatus] = useState("all");
  const [pollVisibility, setPollVisibility] = useState("all");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  const {
    data,
    isLoading: pollLoading,
    error: pollError,
  } = useGetPollsQuery({
    q: pollStatus,
    visibility: pollVisibility,
    limit,
    offset,
  });

  const {
    data: trendingPolls,
    isLoading: trendingPollLoading,
    error: trendingPollerror,
  } = useGetTrendingPollsQuery();

  const totalPolls = data?.total;
  const totalPage = Math.ceil(totalPolls / limit);

  const polls = data?.polls;
  console.log(polls);

  function handleChangePollStatus(status) {
    setPollStatus(status);
    setPage(1);
  }
  function handleChangePollVisibility(status) {
    setPollVisibility((prevVisibility) =>
      prevVisibility === status ? "all" : status,
    );
    setPage(1);
  }

  function handleChangePage(currentPage) {
    if (currentPage < 1 || currentPage > totalPage) return;

    setPage(currentPage);
  }

  return (
    <div className="relative">
      <section className="relative bg-[#fff1ed98] py-20">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bg})`,
            opacity: 0.8,
            zIndex: -1,
          }}
        ></div>
        {pollLoading && (
          <div className="absolute inset-0 flex items-center justify-center border-4">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="loader"></span>
            </div>
          </div>
        )}
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="my-5 text-left text-3xl font-extrabold text-[black] md:text-5xl">
            Trending
          </h1>
          {trendingPollLoading ? (
            <div className="flex items-center justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="flex flex-col gap-4 md:flex-row">
              {trendingPolls?.polls?.map((poll) => (
                <TrendingPoll poll={poll} />
              ))}
            </div>
          )}
        </div>
      </section>

      {!pollLoading && (
        <section className="py-10">
          <div className="flex flex-col gap-5">
            <div className="mx-auto w-full max-w-6xl px-4">
              <h2 className="text-left text-lg font-semibold uppercase">
                Explore ✨
              </h2>
            </div>

            <div className="">
              <div className="mx-auto max-w-6xl px-4">
                <div className="my-2 flex flex-wrap gap-5">
                  <select className=" rounded-md border border-[#dcdbdb] px-2 py-1.5 focus:outline-[#dcdbdb]">
                    <option selected>Last 7 days</option>
                    <option>Last 1 month</option>
                    <option>All time</option>
                  </select>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center overflow-hidden rounded-md border border-[#dcdbdb] bg-white px-1 py-1 shadow-sm sm:text-lg">
                      <div
                        onClick={() => handleChangePollStatus("all")}
                        className={`cursor-pointer rounded-md px-3 ${pollStatus === "all" && "bg-[#ff5f2eca] text-white"}`}
                      >
                        All
                      </div>
                      <div
                        onClick={() => handleChangePollStatus("active")}
                        className={`cursor-pointer rounded-md px-3 ${pollStatus === "active" && "bg-[#ff5f2eca] text-white"}`}
                      >
                        Active
                      </div>
                      <div
                        onClick={() => handleChangePollStatus("closed")}
                        className={`cursor-pointer rounded-md px-3 ${pollStatus === "closed" && "bg-[#ff5f2eca] text-white"}`}
                      >
                        Closed
                      </div>
                    </div>
                    <div className="flex justify-between ">
                      <div className="flex items-center overflow-hidden rounded-md border border-[#dcdbdb] bg-white px-1 py-1 shadow-sm sm:text-lg">
                        <div
                          onClick={() => handleChangePollVisibility("public")}
                          className={`cursor-pointer rounded-md px-3 ${pollVisibility === "public" && "bg-[#ff5f2eca] text-white"}`}
                        >
                          Public
                        </div>
                        <div
                          onClick={() => handleChangePollVisibility("private")}
                          className={`cursor-pointer rounded-md px-3 ${pollVisibility === "private" && "bg-[#ff5f2eca] text-white"}`}
                        >
                          Private
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mx-auto max-w-6xl px-4">
                <div className="grid-cols-auto-320 grid content-start gap-4">
                  {polls.map((poll) => (
                    <div
                      className="h-[150px] min-w-80 space-y-2 rounded-md border border-gray-200 bg-[#fffbfb] p-4 shadow-md shadow-[#b8b8b8]"
                      key={poll._id}
                    >
                      <div className="flex h-full flex-col">
                        <div className="mb-1 flex items-center gap-2">
                          <img
                            className="h-6 w-6 rounded-full bg-blue-500 object-cover shadow-md"
                            src={`${poll.user.avatar}`}
                            alt="user"
                          />
                          <div className="text-[#383737]">{poll.user.name}</div>
                        </div>
                        <div className="text-lg font-semibold">
                          {poll.title}
                        </div>
                        <div className="mt-auto flex items-center gap-2">
                          <div className="text-md text-gray-600">
                            <TimeAgo date={poll.createdAt} live={false} />
                          </div>
                          <Link
                            to={`/poll/${poll._id}`}
                            className="ml-auto rounded-md border border-[#c4c4c4] px-2 transition-all duration-300 hover:bg-[#222121] hover:text-[#d0cfcf] "
                          >
                            <GrFormNextLink size={25} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between bg-[#e7e7e700] px-4 py-3">
                  <div className="">
                    Showing{" "}
                    <span className="font-bold">{(page - 1) * limit + 1}</span>{" "}
                    to{" "}
                    <span className="font-bold">
                      {Math.min(page * limit, totalPolls)}
                    </span>{" "}
                    of <span className="font-bold">{totalPolls}</span> results
                  </div>
                  <div className="flex items-center overflow-hidden rounded-md  border border-[#acabab] font-bold">
                    {page > 1 && (
                      <button
                        onClick={() => handleChangePage(page - 1)}
                        className="border border-b-0 border-l-0 border-r border-t-0 border-[#acabab] px-4 py-2 transition-all duration-300 hover:bg-black hover:text-white"
                      >
                        Previous
                      </button>
                    )}
                    {page < totalPage && (
                      <button
                        onClick={() => handleChangePage(page + 1)}
                        className="px-4 py-2 transition-all duration-300 hover:bg-black hover:text-white"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export { DiscoverPolls };
