import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";

import { fetchPollsCreatedByUser } from "../../utils/api";
import store from "../../redux/store";
import requireAuth from "../../utils/requireAuth";
import { useGetUserPollsQuery } from "../../redux/api";
import { useSelector } from "react-redux";
import { userSelector } from "./userSlice";
import { useState } from "react";

export function UserPolls() {
  const [pollStatus, setPollStatus] = useState("all");
  const [pollVisibility, setPollVisibility] = useState("all");

  const userId = useSelector((state) => state.user.user._id);
  const {
    data,
    isLoading: pollLoading,
    error: pollError,
  } = useGetUserPollsQuery({ userId, q: pollStatus, visibility: pollVisibility });

  const polls = data?.polls.map((poll) => {
    return { ...poll, poll_status: poll.poll_status ?? "public" };
  });

  function handleChangePollStatus(status) {
    setPollStatus(status);
  }
  function handleChangePollVisibility(status) {
    setPollVisibility((prevVisibility) =>
      prevVisibility === status ? "all" : status,
    );
  }

  return (
    <div className="mx-auto w-[90%] bg-[#f9f9f9] px-6 py-6">
      <div>
        <h1 className="mt-2 text-3xl font-semibold">All Polls</h1>
        <div className="flex py-4 px-2 bg-[#f9f9f9] items-center justify-between gap-4 sticky top-0">
          <input
            placeholder="Search poll"
            className="rounded-md border border-[#d7d6d6] px-3 py-1 text-lg outline-none"
          />
          <div className="flex gap-2 items-center">
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
              <div className="flex items-center overflow-hidden rounded-md border border-[#dcdbdb] py-1 bg-white px-1 text-lg shadow-sm">
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
        {pollLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="loader"></span>
            </div>
          </div>
        ) : (
          <Table polls={polls} />
        )}
      </div>
    </div>
  );
}

function Table({ polls }) {
  return (
    <div className="overflow-hidden rounded-md border border-[#d4d4d4] shadow-md">
      <div className="grid grid-cols-[0.4fr_0.2fr_0.2fr_0.1fr_0.1fr] rounded-md rounded-b rounded-bl-none rounded-br-none px-4 py-4 text-sm font-bold">
        <div>TITLE</div>
        <div>PUBLISHED ON</div>
        <div>STATUS</div>
        <div>VOTES</div>
        <div>ACTION</div>
      </div>
      <div>
        {polls?.map((poll) => (
          <div className="grid grid-cols-[0.4fr_0.2fr_0.2fr_0.1fr_0.1fr] border-b bg-white px-4 py-4 text-sm font-normal hover:bg-gray-50">
            <div class="">
              <Link to={`/poll/${poll.id}`}>{poll.title}</Link>
            </div>
            <div className="">{formattedDate(poll.publishedAt)}</div>
            <div className="flex items-center gap-2">
              <div
                className={`${poll.poll_status === "public" ? "border-[#84f484] bg-[#9ffa9f] text-green-700 shadow-md" : "border-red-300 bg-[#ee7c7c] text-[#2c2c2c] shadow-md"} flex w-fit items-center justify-center rounded-md border px-3 font-medium`}
              >
                {poll.poll_status}
              </div>
              {!poll.isLive && (
                <div className="rounded-md border border-slate-300 bg-[#b4b3b3] px-3 font-medium text-[#2c2c2c] shadow-md">
                  {"closed"}
                </div>
              )}
            </div>
            <div class="">{poll.totalVotes || "0"}</div>

            <div className="flex gap-4">
              <Link className="text-black hover:text-[#ff7653]">
                <LiaEdit size={20} />
              </Link>
              <Link className="text-black hover:text-[#ff6d50]">
                <MdDelete size={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between bg-[#e7e7e7] px-4 py-3">
        <div className="font-bold">Showing 11 to 20 of 55 results</div>
        <div className="flex gap-2 font-bold">
          <button className="rounded-md border border-[#acabab] px-4 py-2">
            Previous
          </button>
          <button className="rounded-md border border-[#acabab] px-4 py-2">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

const formattedDate = (dateString) => {
  const date = new Date(dateString);

  const options = { weekday: "long", day: "2-digit", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};
