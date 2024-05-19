import { Link, useLoaderData } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";

import { fetchPollsCreatedByUser } from "../../utils/api";
import store from "../../../store";
import requireAuth from "../../utils/requireAuth";

function getStatus() {
  const status = ["Closed", "Live"];

  return status[Math.floor(Math.random() * status.length)];
}

export function UserPolls() {
  let { polls } = useLoaderData();

  polls = polls.map((poll) => {
    return { ...poll, status: getStatus() };
  });


  polls = polls.concat(...Array(2).fill(polls));
  return (
    <div className="mx-auto w-[90%] bg-[#f9f9f9] px-6 py-6">
      <div>
        <h1 className="mt-2 text-3xl font-semibold">All Polls</h1>
        <div className="my-6 flex justify-between ">
          <input
            placeholder="Search poll"
            className="rounded-md border border-[#d7d6d6] px-3 py-1 text-lg outline-none"
          />
          <div className="flex items-center overflow-hidden rounded-md border border-[#dcdbdb] bg-white px-1 text-lg shadow-sm">
            <div className="rounded-md bg-[#ff5f2eca] px-3 text-white">All</div>
            <div className="rounded-md px-3 py-1">Active</div>
            <div className="rounded-md px-3 py-1">Closed</div>
          </div>
        </div>
        <Table polls={polls} />
      </div>
    </div>
  );
}

function Table({ polls }) {
  return (
    <div className="overflow-hidden rounded-md border border-[#d4d4d4] shadow-md">
      <div className="grid text-sm grid-cols-[0.4fr_0.2fr_0.2fr_0.1fr_0.1fr] rounded-md rounded-b rounded-bl-none rounded-br-none px-4 py-4 font-bold">
        <div>TITLE</div>
        <div>PUBLISHED ON</div>
        <div>STATUS</div>
        <div>VOTES</div>
        <div>ACTION</div>
      </div>
      <div>
        {polls?.map((poll) => (
          <div className="grid font-normal text-sm grid-cols-[0.4fr_0.2fr_0.2fr_0.1fr_0.1fr] border-b bg-white px-4 py-4 hover:bg-gray-50">
            <div class="">
              <Link to={`/poll/${poll.id}`}>{poll.title}</Link>
            </div>
            <div class="">{formattedDate(poll.publishedAt)}</div>
            <div
              class={`${poll.status === "Live" ? "bg-[#9ffa9f] text-green-700 border-green-800" : "bg-[#d6d6d6] border-slate-500 text-[#2c2c2c]"} w-fit border flex justify-center items-center rounded-lg font-semibold px-3`}
            >
              {poll.status}
            </div>

            <div class="">{poll.totalVotes || "0"}</div>

            <div class="flex gap-4">
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
      <div className="flex bg-[#e7e7e7] items-center justify-between px-4 py-3">
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

export async function UserPollsLoader({ request }) {
  await requireAuth(request, true);
  const userInfo = { ...store.getState().user.user };

  const polls = await fetchPollsCreatedByUser(userInfo._id);

  return polls;
}

const formattedDate = (dateString) => {
  const date = new Date(dateString);

  const options = { weekday: "long", day: "2-digit", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};