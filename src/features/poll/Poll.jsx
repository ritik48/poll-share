import {
  useLoaderData,
  defer,
  Await,
  useNavigate,
  useFetcher,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import Countdown from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { fetchCurrentUser, updateVote, userSelector } from "../user/userSlice";
import { addVote, deletePoll, fetchPoll } from "../../utils/api";
import { IoTrendingUpSharp } from "react-icons/io5";
import { FcLineChart, FcComboChart } from "react-icons/fc";
import store from "../../redux/store";

function formatDate(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}

function Option({ option, vote, onVote, id, index, loading, selectedOption }) {
  const votes = useSelector((state) => state.user.user?.vote);
  const userChoice = votes?.find((vote) => vote.poll_id === id)?.poll_choice;

  return (
    <div
      onClick={() => onVote(id, index)}
      className="relative flex cursor-pointer justify-between overflow-hidden rounded-full border border-[#2e2e2e54] px-6 py-4 text-left transition-all duration-300 ease-in-out hover:translate-y-[-8px]"
    >
      <div
        className={`flex items-center gap-4 text-lg ${vote > 0 ? "text-white" : "text-black"}`}
      >
        {index === userChoice && (
          <img
            alt="user"
            src="/assets/bg-images/user.png"
            className="w-8 rounded-full border border-stone-500 p-0.5"
          />
        )}
        <div>{option}</div>
      </div>
      <div className="text-md mr-10">
        {selectedOption === index && loading && "Polling...  "}
        {vote}%
      </div>
      <div className="absolute inset-0 z-[-1] " style={{ width: `${vote}%` }}>
        <div
          className={`absolute inset-0 animate-[option_0.6s_ease-in-out_1] 
          ${
            vote > 0 && userChoice === index ? "bg-[#ff8e6b]" : "bg-[#c7db7e]"
          }`}
        ></div>
      </div>
    </div>
  );
}


export function Poll() {
  const navigate = useNavigate();
  const { poll } = useLoaderData();
  const fetcher = useFetcher();
  const loading = fetcher.state !== "idle";
  const [selectedOption, setSelectedOption] = useState(null);
  const { username } = useSelector(userSelector);

  const dispatch = useDispatch();

  function handleSelected(id) {
    setSelectedOption(id);
  }

  async function handleVote(id, choice) {
    handleSelected(choice);
    fetcher.submit({ id: id, choice: choice }, { method: "POST" });
  }

  async function handleDeletePoll(id) {
    const res = await deletePoll(id);

    toast(res.message);
    if (res.success) {
      navigate("/");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const fetcherData = fetcher.data;
      if (fetcher.state === "idle" && fetcherData) {
        if (!fetcherData.success) {
          toast(fetcher.data.message);
        }
      }
    };

    fetchData();
  }, [fetcher, dispatch]);

  return (
    <div className="pb-10 pt-28">
      <React.Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="loader"></span>
            </div>
          </div>
        }
      >
        <div className="mx-auto max-w-6xl">
          <Await resolve={poll}>
            {({ poll }) => {
              // console.log(poll.votes);
              return (
                <div className="flex">
                  <div className="flex-grow space-y-7">
                    <h2 className="text-4xl">{poll.title}</h2>
                    <div className="flex items-center gap-4">
                      <img
                        className="w-8 rounded-full border border-slate-700"
                        src={`${poll.user.avatar || "/assets/bg-images/user.png"}`}
                        alt="profile"
                      />
                      <div className="text-md font-semibold">
                        {poll.user.name}
                      </div>
                      <div className="text-md ml-auto flex items-center gap-4 rounded-md border px-2 font-semibold shadow-md">
                        <span>{poll.views} Views</span>
                        <FcComboChart size={30} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {poll.options.map((option, index) => (
                        <Option
                          option={option}
                          vote={poll.votes[index] ? poll.votes[index] : 0}
                          onVote={handleVote}
                          id={poll._id}
                          index={index}
                          key={
                            poll.votes[index]
                              ? poll.votes[index] + index
                              : index
                          }
                          loading={loading}
                          selectedOption={selectedOption}
                        />
                      ))}
                    </div>
                    <div>{formatDate(poll.publishedAt)}</div>
                    <div className="flex gap-1">
                      {poll.category?.map((category) => (
                        <span
                          key={category}
                          className="rounded-lg border border-slate-400 px-2"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    {username === poll.user.username && (
                      <button
                        onClick={() => handleDeletePoll(poll._id)}
                        className="text-x w-fit rounded-md border bg-black px-4 py-2 text-white transition-all duration-300 ease-in-out hover:border-black hover:bg-transparent hover:text-black"
                      >
                        Delete Poll 🗑️
                      </button>
                    )}
                  </div>
                  <div className="flex w-[30%] flex-col items-center justify-center gap-4">
                    <div className="text-4xl font-light tracking-widest">
                      <Countdown date={new Date(poll.expiresAt).getTime()} />
                    </div>
                    <div className="flex items-center gap-4 text-4xl font-semibold">
                      <span>{poll.totalVotes}</span>
                      <FcLineChart color="green" size={40} />
                    </div>
                  </div>
                </div>
              );
            }}
          </Await>
        </div>
      </React.Suspense>
    </div>
  );
}

export async function pollLoader({ request, params }) {
  const { id } = params;

  const poll = fetchPoll(id);
  console.log("here again");
  return defer({ poll });
}

export async function pollAction({ request }) {
  const formData = await request.formData();
  const { id, choice } = Object.fromEntries(formData);

  // update the vote
  const data = await addVote(id, choice);
  if (!data.success) {
    return { success: false, message: data.message };
  }

  // update user vote in the redux state
  store.dispatch(updateVote({ poll_id: id, poll_choice: choice }));

  return { success: true, message: "Successfully polled." };
}
