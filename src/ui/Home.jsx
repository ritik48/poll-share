import { Link, useLoaderData } from "react-router-dom";
import { Hero } from "../App";

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
        <h1 className="text-5xl font-semibold">Active Polls</h1>
        <div className="grid-cols-auto-320 grid content-start items-start gap-2">
          {polls.map((poll) => (
            <div
              className="min-w-80 space-y-2 rounded-md border border-gray-200 bg-[#fffbfb] p-4 shadow-md shadow-[#b8b8b8]"
              key={poll._id}
            >
              {/* <img
                className="h-52 w-full rounded-md bg-red-500"
                src="https://loremflickr.com/640/480/abstract"
                alt="bg"
              /> */}
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <img
                    className="h-6 w-6 rounded-full bg-blue-500 object-cover shadow-md"
                    src={`${poll.user.avatar}`}
                    alt="user"
                  />
                  <div className="text-[#383737]">{poll.user.name}</div>
                </div>
                <div className="text-lg font-semibold">{poll.title}</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="text-md text-gray-600">3h ago</div>
                  <Link
                    to={`poll/${poll._id}`}
                    className="ml-auto rounded-md border border-[#c4c4c4] px-2 transition-all duration-300 hover:bg-[#222121] hover:text-[#d0cfcf] "
                  >
                    <GrFormNextLink size={25} />
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
