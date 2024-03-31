import {
  useLoaderData,
  defer,
  Await,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import React from "react";
import { addVote, fetchPoll } from "../../utils/api";
import { toast } from "react-toastify";
import { createUser, userSelector } from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function formatTime(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}

function Option({ option, vote, onVote, id, index }) {
  const votes = useSelector((state) => state.user.user?.vote);

  const navigation = useNavigation();
  const userChoice = votes?.find((vote) => vote.poll_id === id)?.poll_choice;

  return (
    <div
      onClick={() => onVote(id, index)}
      className="relative flex cursor-pointer justify-between overflow-hidden rounded-full border border-[#2e2e2e54] px-6 py-4 text-left transition-all duration-300 ease-in-out hover:translate-y-[-8px]"
    >
      <div className=" text-lg text-white">{option}</div>
      <div className="text-md mr-10">
        {userChoice === index && navigation.state === "loading" && "Polling...  "}
        {vote}%
      </div>
      <div className="absolute inset-0 z-[-1] " style={{ width: `${vote}%` }}>
        <div
          className={`absolute inset-0 animate-[option_0.6s_ease-in-out_1] ${userChoice === index && navigation.state !== "loading" ? "bg-green-500" : "bg-[#ff8e6b]"}`}
        ></div>
      </div>
    </div>
  );
}

export function Poll() {
  const { username } = useSelector(userSelector);

  const dispatch = useDispatch();

  const { poll } = useLoaderData();

  const navigate = useNavigate();

  async function handleVote(id, choice) {
    const data = await addVote(id, choice);

    if (!data.success) {
      return toast(data.message, { autoClose: 2000 });
    }
    dispatch(createUser(data.user));
    toast("Your vote has been recorded");
    navigate(".", { replace: true });
  }

  return (
    <div className="pt-32">
      <React.Suspense
        fallback={
          <div className="absolute flex w-full items-center justify-center text-6xl">
            Loading...
          </div>
        }
      >
        <div>
          <div className="mx-auto max-w-6xl">
            <Await resolve={poll}>
              {({ poll }) => {
                return (
                  <div className="mx-auto max-w-[70%] space-y-7">
                    <h2 className="text-4xl">{poll.title}</h2>
                    <div>Posted by: {poll.user.name}</div>
                    <div className="flex flex-col gap-4">
                      {poll.options.map((option, index) => (
                        <Option
                          option={option}
                          vote={poll.votes[index]}
                          onVote={handleVote}
                          id={poll._id}
                          index={index}
                          key={poll.votes[index] + index}
                        />
                      ))}
                    </div>
                    <div>{formatTime(poll.createdAt)}</div>
                  </div>
                );
              }}
            </Await>
          </div>
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
