import { Link, useLoaderData } from "react-router-dom";
import { Hero } from "../App";

import { GrFormNextLink } from "react-icons/gr";
import { fetchAllPolls } from "../utils/api";

import createImg from "../assets/home/create.png";

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

function FeatureSection() {
  return (
    <div className="my-20 py-10">
      <div className="mx-auto mt-[-150px] max-w-6xl px-4">
        <h2 className="text-center text-5xl font-extrabold">
          What we{" "}
          <span className="bg-orange-500 px-4 text-[#fffbf3]">offer ?</span>
        </h2>
        <p className="mx-auto my-10 w-full text-center text-xl text-gray-700 sm:w-1/2">
          At Poll Share, we provide a platform where you can create, share, and
          participate in polls on a variety of topics and much more.
        </p>
        <div className="mt-20 flex flex-col gap-40">
          <div className="flex justify-between">
            <div className="flex w-2/5 flex-col items-start gap-5">
              <h2 className="text-2xl font-extrabold text-[#ff5f2eca]">
                Create higly{" "}
                <span className="bg-orange-800 px-4 text-[#fffbf3]">
                  customisable polls
                </span>
              </h2>
              <p className="text-xl font-medium text-gray-700">
                At Poll Share, we empower you to craft polls tailored to your
                needs. With our intuitive platform, you can:
              </p>
              <div className="mt-2 flex flex-col gap-6">
                <span className="text-xl font-bold">
                  🚀 Give Your Polls a Distinct Title
                </span>
                <span className="text-xl font-bold">
                  ➕ Add Multiple Options
                </span>
                <span className="text-xl font-bold">
                  🏷️ Categorize Your Polls
                </span>
                <span className="text-xl font-bold">👁️ Control Visibility</span>
              </div>
              <Link
                to={"/create"}
                className="text-semibold my-2 rounded-md bg-[#f25b2dca] px-4 py-1.5 text-lg text-white hover:bg-[#ff5f2eca]"
              >
                Create now
              </Link>
            </div>
            <div className="w-1/2 self-center overflow-hidden rounded-3xl shadow-xl">
              <img className="" src={createImg} alt="bg" />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex w-2/5 flex-col items-start gap-5">
              <h2 className="text-2xl font-extrabold text-[#ff5f2eca]">
                Give your vote, participate in{" "}
                <span className="bg-orange-800 px-4 text-[#fffbf3]">
                  dicussions
                </span>
              </h2>
              {/* <p className="text-xl font-medium text-gray-700">
                Make your opinion count on a diverse range of topics. Engage
                with others in discussions
              </p> */}
              <div className="mt-2 flex flex-col gap-6">
                <span className="text-xl font-bold">
                  📊 Give vote, make your opinion count
                </span>
                <span className="text-xl font-bold">
                  💬 Engage with others in the comments associated with every
                  poll
                </span>
              </div>
            </div>
            <div className="w-1/2 self-center overflow-hidden rounded-3xl shadow-xl">
              <img className="" src={createImg} alt="bg" />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex w-2/5 flex-col items-start gap-5">
              <h2 className="text-2xl font-extrabold text-[#ff5f2eca]">
                Unlock Insights with Our Robust{" "}
                <span className="bg-orange-800 px-4 text-[#fffbf3]">
                  Analytical Dashboard
                </span>
              </h2>
              <p className="text-xl font-medium text-gray-700">
                Experience the power of data-driven decision-making with our
                Analytical Dashboard
              </p>
              <div className="mt-2 flex flex-col gap-6">
                <span className="text-xl">
                  🚀 <span className="font-bold">Insightful Data:</span>{" "}
                  Discover key metrics like votes, views, and engagement.
                </span>
                <span className="text-xl">
                  ➕ <span className="font-bold">Visualize Data:</span> See
                  trends at a glance with interactive charts.
                </span>
                <span className="text-xl">
                  🏷️ <span className="font-bold">Real-Time Updates:</span> Stay
                  current with live poll activity.
                </span>
                <span className="text-xl">and much more</span>
              </div>
            </div>
            <div className="w-1/2 self-center overflow-hidden rounded-3xl shadow-xl">
              <img className="" src={createImg} alt="bg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { polls } = useLoaderData();
  return (
    <>
      <Hero />
      <FeatureSection />
      <Polls polls={polls} />
    </>
  );
}
