import {
  useLoaderData,
  defer,
  Await,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Countdown from "react-countdown";
import React, { useState } from "react";
import { addVote, deletePoll, fetchPoll } from "../../utils/api";
import { toast } from "react-toastify";
import { createUser, userSelector } from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function formatTime(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  console.log(`${date.getHours()} : ${date.getMinutes()}`);

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}

function Option({ option, vote, onVote, id, index, loading, selectedOption }) {
  const votes = useSelector((state) => state.user.user?.vote);

  const navigation = useNavigation();
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
          className={`absolute inset-0 animate-[option_0.6s_ease-in-out_1] ${vote > 0 && userChoice === index && navigation.state !== "loading" ? "bg-[#ff8e6b]" : "bg-[#e1cf4a]"}`}
        ></div>
      </div>
    </div>
  );
}

function timeLeft(publishedAt, expiresAt) {
  const d1 = new Date(publishedAt);
  const d2 = new Date(expiresAt);
  console.log(d2.getTime() - d1.getTime());
  return d2.getTime();

  // let date = new Date(timestamp);
  // console.log(date);
  // date.setMinutes(date.getMinutes() + minutes);
  // console.log(date);
  // return date;
}

export function Poll() {
  const dispatch = useDispatch();
  const { poll } = useLoaderData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const { username } = useSelector(userSelector);

  const navigation = useNavigation();
  console.log("state = = = ", navigation.state);

  function handleSelected(id) {
    setSelectedOption((prev) => (prev === id ? null : id));
  }

  async function handleVote(id, choice) {
    setLoading(true);
    handleSelected(choice);

    const data = await addVote(id, choice);
    setLoading(false);

    if (!data.success) {
      handleSelected(null);
      return toast(data.message, { autoClose: 2000 });
    }
    dispatch(createUser(data.user));
    toast("Your vote has been recorded");
    navigate(".", { replace: true });
  }

  async function handleDeletePoll(id) {
    const res = await deletePoll(id);

    console.log("delete = ", res);
    toast(res.message);

    if (res.success) {
      navigate("/");
    }
  }

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
  return defer({ poll });
}
