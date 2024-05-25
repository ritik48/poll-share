import { Await, Link, defer, useLoaderData } from "react-router-dom";
import store from "../../redux/store";
import { fetchPoll, fetchUserPoll } from "../../utils/api";
import requireAuth from "../../utils/requireAuth";
import { GrFormNextLink } from "react-icons/gr";
import React from "react";
import { FcComboChart } from "react-icons/fc";

export function Votes() {
  const { polls } = useLoaderData();

  return (
    <div className="mx-auto w-[90%] bg-[#f9f9f9] px-6 py-6">
      <div>
        <h1 className="mt-2 text-3xl font-semibold">
          Polls you have interacted with{" "}
        </h1>
        <React.Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="loader"></span>
              </div>
            </div>
          }
        >
          <div className="my-6 flex flex-wrap items-start gap-2">
            <Await resolve={polls}>
              {(polls) => {
                return polls.map(({ poll, choice }) => {
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
                        <div className="text-md font-semibold">
                          {poll.title}
                        </div>
                        <div className="my-2 flex items-center gap-2">
                          <span className="text-sm font-semibold">You : </span>
                          <p className="text-sm font-semibold text-[#646262]">
                            {choice}
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
                });
              }}
            </Await>
          </div>
        </React.Suspense>
      </div>
    </div>
  );
}

export async function voteLoader({ request }) {
  await requireAuth(request, true);

  const userVotes = store.getState().user.user.vote;

  const polls = fetchUserPoll(userVotes);
  console.log(polls);

  return defer({ polls });
}
