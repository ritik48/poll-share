/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useGetUserVotedPollsQuery } from "../../redux/api";
import { useSelector } from "react-redux";
import { GrFormNextLink } from "react-icons/gr";

export function Votes() {
  const [pollStatus, setPollStatus] = useState("all");
  const [pollVisibility, setPollVisibility] = useState("all");

  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;

  const userId = useSelector((state) => state.user.user._id);
  const {
    data,
    isFetching: pollLoading,
    error: pollError,
  } = useGetUserVotedPollsQuery({
    userId,
    q: pollStatus,
    visibility: pollVisibility,
    limit,
    offset,
  });

  const totalPolls = data?.total;
  const totalPage = Math.ceil(totalPolls / limit);

  const polls = data?.polls;

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

  function getUsersChoice(poll) {
    const choice = poll.votes.find((v) => v.user === userId).option;
    return poll.options[choice];
  }

  return (
    <div className="mx-auto w-[90%] bg-[#f9f9f9] px-6 py-6">
      <div>
        <h1 className="mt-2 text-3xl font-semibold">
          Polls you have interacted with{" "}
        </h1>

        {pollLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="loader"></span>
            </div>
          </div>
        )}

        <div className="sticky top-0 flex items-center justify-between gap-4 bg-[#f9f9f9] px-2 py-4">
          <input
            placeholder="Search poll"
            className="rounded-md border border-[#d7d6d6] px-3 py-1 text-lg outline-none"
          />
          <div className="flex items-center gap-2 text-sm">
            <div className="mr-2 font-medium text-gray-700">
              (Results : <span className="">{totalPolls}</span>)
            </div>
            <div className="flex items-center overflow-hidden rounded-md border border-[#dcdbdb] bg-white px-1 py-1 text-lg shadow-sm">
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
              <div className="flex items-center overflow-hidden rounded-md border border-[#dcdbdb] bg-white px-1 py-1 text-lg shadow-sm">
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
        <div className="my-6 flex flex-wrap items-start gap-2">
          {polls?.map((poll) => {
            return (
              <div
                className="min-w-80 max-w-80 space-y-2 rounded-md border border-gray-200 bg-[#fffbfb] p-4 shadow-md shadow-[#b8b8b8]"
                key={poll._id}
              >
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <img
                      className="h-6 w-6 rounded-full bg-blue-500 object-cover shadow-md"
                      src={`${poll.user.avatar}`}
                      alt="user"
                    />
                    <div className="text-[#383737]">{poll.user.name}</div>
                  </div>
                  <div className="text-md font-semibold">{poll.title}</div>
                  <div className="my-2 flex items-center gap-2">
                    <span className="text-sm font-semibold">You : </span>
                    <p className="text-sm font-semibold text-[#646262]">
                      {getUsersChoice(poll)}
                    </p>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="text-md text-gray-600">3h ago</div>
                    <Link
                      to={`/poll/${poll._id}`}
                      className="ml-auto rounded-md border border-[#c4c4c4] px-2 transition-all duration-300 hover:bg-[#222121] hover:text-[#d0cfcf] "
                    >
                      <GrFormNextLink size={25} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {totalPolls === 0 ? (
          <div className="text-center text-3xl">Cannot find any polls</div>
        ) : (
          <div className="flex items-center justify-between bg-[#e7e7e700] px-4 py-3">
            <div className="">
              Showing{" "}
              <span className="font-bold">{(page - 1) * limit + 1}</span> to{" "}
              <span className="font-bold">
                {Math.min(page * limit, totalPolls)}
              </span>{" "}
              of <span className="font-bold">{totalPolls}</span> results
            </div>
            <div className="flex overflow-hidden rounded-md  border border-[#acabab] font-bold">
              {
                <button
                  onClick={() => handleChangePage(page - 1)}
                  disabled={page === 1}
                  className={`${page === 1 ? "text-gray-500 hover:bg-none" : "hover:bg-black hover:text-white"} border border-b-0 border-l-0 border-r border-t-0 border-[#acabab] px-4 py-2 transition-all duration-300 `}
                >
                  Previous
                </button>
              }
              {
                <button
                  onClick={() => handleChangePage(page + 1)}
                  className={`${page === totalPage ? "text-gray-500 hover:bg-none" : "hover:bg-black hover:text-white"} px-4 py-2 transition-all duration-300`}
                >
                  Next
                </button>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
