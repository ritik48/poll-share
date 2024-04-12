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

import { fetchCurrentUser, userSelector } from "../user/userSlice";
import { addVote, deletePoll, fetchPoll } from "../../utils/api";


function formatTime(timestamp) {
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
          className={`absolute inset-0 animate-[option_0.6s_ease-in-out_1] ${vote > 0 && userChoice === index ? "bg-[#ff8e6b]" : "bg-[#e1cf4a]"}`}
        ></div>
      </div>
    </div>
  );
}

function timeLeft(publishedAt, expiresAt) {
  const d1 = new Date(publishedAt);
  const d2 = new Date(expiresAt);
  // console.log(d2.getTime() - d1.getTime());
  return d2.getTime();
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
    const fetcherData = fetcher.data;
    if (fetcher.state === "idle" && fetcherData) {
      if (fetcherData.success) {
        dispatch(fetchCurrentUser());
        toast("Your vote has been recorded");
      } else {
        toast(fetcher.data.message);
      }
    }
  }, [fetcher, dispatch]);

  return (
    <div className="pt-32">
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
                        src={`${poll.user.avatar}`}
                        alt="profile"
                      />
                      <div className="text-md font-semibold">
                        {poll.user.name}
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
                    <div>{formatTime(poll.publishedAt)}</div>
                    <div className="flex gap-1">
                      🏷️
                      <span className="rounded-lg border border-slate-400 px-2">
                        tech
                      </span>
                      <span className="rounded-lg border border-slate-400 px-2">
                        fashion
                      </span>
                      <span className="rounded-lg border border-slate-400 px-2">
                        environment
                      </span>
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
                  <div className="flex w-[30%] flex-col items-center justify-center gap-3">
                    <div className="text-4xl font-light tracking-widest">
                      <Countdown
                        date={timeLeft(poll.publishedAt, poll.expiresAt)}
                      />
                    </div>
                    <div className="text-4xl font-semibold">
                      {poll.totalVotes} 📈
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

  return { success: true, message: "Successfully polled." };
}
