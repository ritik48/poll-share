import { useLoaderData, defer, Await } from "react-router-dom";
import requireAuth from "../../utils/requireAuth";
import React from "react";
import { fetchPolls } from "../../utils/api";

export function Poll() {
  const loaderData = useLoaderData();
  return (
    <div className="pt-32">
      <React.Suspense
        fallback={
          <div className="absolute flex w-full items-center justify-center text-6xl">
            Loading...
          </div>
        }
      >
        <h1 className="text-6xl">All Polls 🟢</h1>
        <Await resolve={loaderData.polls}>
          {(loadedPolls) => {
            console.log(loadedPolls);
            return loadedPolls.polls.map((poll) => (
              <div className="text-lg" key={poll._id}>
                {poll.title}
              </div>
            ));
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}

export async function pollLoader({ request, param }) {
  await requireAuth(request, true);

  const polls = fetchPolls();
  return defer({ polls });
}
