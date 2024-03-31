import { Link, useLoaderData } from "react-router-dom";
import { Hero } from "../App";
// import { Poll } from "../features/poll/Poll";
import { GrFormNextLink } from "react-icons/gr";
import { fetchAllPolls } from "../utils/api";

function Polls({ polls }) {
  console.log(polls);
  return (
    <div>
      <div
        id="polls"
        className="mx-auto mb-10 mt-[-50px] max-w-6xl space-y-8 px-4"
      >
        <h1 className="text-center text-5xl font-medium">Active Polls</h1>
        <div className="grid-cols-auto-320 grid gap-4">
          {polls.map((poll) => (
            <div
              className="min-w-80 space-y-2 rounded-md border border-gray-400 p-2"
              key={poll._id}
            >
              <img
                className="h-52 w-full rounded-md bg-red-500"
                src="https://loremflickr.com/640/480/abstract"
                alt="bg"
              />
              <div>
                <div className="text-md text-gray-600">3h ago</div>
                <div className="text-lg font-semibold">{poll.title}</div>
                <div className="mt-2 flex items-center gap-2">
                  <img
                    className="h-6 w-6 rounded-full bg-blue-500 object-cover"
                    src={`${poll.user.avatar}`}
                    alt="user"
                  />
                  <div>{poll.user.name}</div>
                  <Link
                    to={`poll/${poll._id}`}
                    className="ml-auto rounded-full border border-gray-500 bg-[#fffbf3]"
                  >
                    <GrFormNextLink size={30} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function homeLoader() {
  const polls = await fetchAllPolls();

  return polls;
}

export default function Home() {
  const { polls } = useLoaderData();
  return (
    <>
      <Hero />
      <Polls polls={polls} />
    </>
  );
}
