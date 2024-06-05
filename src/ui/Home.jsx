import { Link, useLoaderData } from "react-router-dom";
import { Hero } from "../App";
import Countdown from "react-countdown";
import { GrFormNextLink } from "react-icons/gr";
import { fetchAllPolls } from "../utils/api";

import createImg from "../assets/home/create.png";
import trendingImg from "../assets/home/trending.jpg";
import featureVideo from "../assets/home/feature.mp4";

const Poll = ({ polls }) => {
  return (
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
  );
};

function timeLeft(expiresAt) {
  const d = new Date(expiresAt);
  // console.log(d2.getTime() - d1.getTime());
  return d.getTime();
}

function Polls({ polls }) {
  console.log(polls);
  return (
    <div className="pb-10 sm:pb-20 sm:pt-10">
      <div id="polls" className="mx-auto flex gap-10 flex-col max-w-6xl px-4">
        <h1 className="text-center my-10 text-3xl font-extrabold md:text-5xl">
          Explore these{" "}
          <span className="border-8 border-x-0 border-t-0 border-dashed border-[#ff5f2eca]">
            trending polls
          </span>{" "}
          🚀
        </h1>
        <div className="flex flex-col gap-2 md:flex-row">
          <div
            className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-[#fffbfb] p-4 shadow-sm shadow-[#d4d3d3] hover:border-2 hover:border-[#ff5f2eca] md:w-1/2"
            key={polls[1]._id}
          >
            <div className="mb-1 flex items-center gap-5">
              <img
                className="h-5 w-5 rounded-full bg-blue-500 object-cover shadow-md sm:h-10 sm:w-10"
                src={`${polls[1].user.avatar}`}
                alt="user"
              />
              <div className="text-sm text-[#383737] sm:text-xl">
                {polls[1].user.name}
              </div>
              <div className="ml-auto text-sm text-gray-600 sm:text-base">
                3h ago
              </div>
            </div>
            <div className="mt-4 text-xl font-semibold sm:text-2xl">
              {polls[1].title}
            </div>
            <div className="mt-2 flex items-center gap-4">
              <span className="text-xl font-light text-red-500 sm:text-2xl">
                Closes in:{" "}
              </span>
              <div className="text-xl font-light tracking-widest text-red-500 sm:text-2xl">
                <Countdown
                  date={timeLeft(polls[1].expiresAt)}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 text-gray-500">
              <span className="text-semibold text-sm sm:text-base">
                Category
              </span>
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-semibold rounded-xl border px-2 py-1.5 text-sm sm:border-2 sm:text-base">
                    Tech
                  </span>
                  <span className="text-semibold rounded-xl border px-2 py-1.5 text-sm sm:border-2 sm:text-base">
                    Web development
                  </span>
                </div>
                <div className="my-2 flex items-center gap-10 text-sm font-bold text-green-600 sm:my-0 sm:text-lg">
                  <div>+1750 votes</div>
                  <div>+2545 views</div>
                </div>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Link
                to={`poll/${polls[0]._id}`}
                className="ml-auto rounded-md border border-[#c4c4c4] px-2 transition-all duration-300 hover:bg-[#222121] hover:text-[#d0cfcf] "
              >
                <GrFormNextLink size={25} />
              </Link>
            </div>
          </div>
          <div
            className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-[#fffbfb] p-4 shadow-sm shadow-[#d4d3d3] hover:border-2 hover:border-[#ff5f2eca] md:w-1/2"
            key={polls[1]._id}
          >
            <div className="mb-1 flex items-center gap-5">
              <img
                className="h-5 w-5 rounded-full bg-blue-500 object-cover shadow-md sm:h-10 sm:w-10"
                src={`${polls[1].user.avatar}`}
                alt="user"
              />
              <div className="text-sm text-[#383737] sm:text-xl">
                {polls[1].user.name}
              </div>
              <div className="ml-auto text-sm text-gray-600 sm:text-base">
                3h ago
              </div>
            </div>
            <div className="mt-4 text-xl font-semibold sm:text-2xl">
              {polls[1].title}
            </div>
            <div className="mt-2 flex items-center gap-4">
              <span className="text-xl font-light text-red-500 sm:text-2xl">
                Closes in:{" "}
              </span>
              <div className="text-xl font-light tracking-widest text-red-500 sm:text-2xl">
                <Countdown
                  date={timeLeft(polls[1].expiresAt)}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 text-gray-500">
              <span className="text-semibold text-sm sm:text-base">
                Category
              </span>
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-semibold rounded-xl border px-2 py-1.5 text-sm sm:border-2 sm:text-base">
                    Tech
                  </span>
                  <span className="text-semibold rounded-xl border px-2 py-1.5 text-sm sm:border-2 sm:text-base">
                    Web development
                  </span>
                </div>
                <div className="my-2 flex items-center gap-10 text-sm font-bold text-green-600 sm:my-0 sm:text-lg">
                  <div>+1750 votes</div>
                  <div>+2545 views</div>
                </div>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Link
                to={`poll/${polls[0]._id}`}
                className="ml-auto rounded-md border border-[#c4c4c4] px-2 transition-all duration-300 hover:bg-[#222121] hover:text-[#d0cfcf] "
              >
                <GrFormNextLink size={25} />
              </Link>
            </div>
          </div>
        </div>
        <Link
          to={"/discover"}
          className="text-semibold self-start  my-2 rounded-md bg-[#f25b2dca] px-4 py-2 text-lg text-white hover:bg-[#ff5f2eca]"
        >
          Discover Polls
        </Link>
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
    <div className="pb-10 pt-20 sm:py-20">
      <div className="mx-auto mt-[-100px] max-w-6xl px-4">
        <h2 className="text-center text-3xl font-extrabold md:text-5xl">
          What we{" "}
          <span className="bg-[#ff5f2eca] px-4 text-[#fffbf3]">offer ?</span>
        </h2>
        <p className="mx-auto my-10 w-full text-center text-lg text-gray-700 sm:w-1/2 sm:text-xl">
          At Poll Share, we provide a platform where you can create, share, and
          participate in polls on a variety of topics and much more.
        </p>
        <div className="mt-20 flex flex-col gap-20 sm:gap-40">
          <div className="flex flex-col justify-center gap-10 rounded-3xl border border-orange-100 bg-orange-50 p-5 sm:gap-40 sm:p-10 md:flex-row">
            <div className="flex w-full flex-col items-start gap-5 md:w-2/5">
              <h2 className="text-xl font-extrabold text-[#ff5f2eca] sm:text-2xl">
                Create higly{" "}
                <span className="bg-orange-800 px-2 text-[#fffbf3]">
                  customisable polls
                </span>
              </h2>
              <p className="text-lg font-medium text-gray-700 sm:text-xl">
                At Poll Share, we empower you to craft polls tailored to your
                needs. With our intuitive platform, you can:
              </p>
              <div className="mt-2 flex flex-col gap-6">
                <span className="text-base font-bold sm:text-xl">
                  🚀 Give Your Polls a Distinct Title
                </span>
                <span className="text-base font-bold sm:text-xl">
                  ➕ Add Multiple Options
                </span>
                <span className="text-base font-bold sm:text-xl">
                  🏷️ Categorize Your Polls
                </span>
                <span className="text-base font-bold sm:text-xl">
                  👁️ Control Visibility
                </span>
              </div>
              <Link
                to={"/create"}
                className="text-semibold my-2 rounded-md bg-[#f25b2dca] px-4 py-1.5 text-lg text-white hover:bg-[#ff5f2eca]"
              >
                Create now
              </Link>
            </div>
            <div className="self-center overflow-hidden rounded-3xl shadow-xl">
              <video width="350" controls autoPlay={true}>
                <source src={featureVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-10 rounded-3xl border border-orange-100 bg-orange-50 p-5 sm:gap-40 sm:p-10 md:flex-row">
            <div className="flex w-full flex-col items-start gap-5 md:w-2/5">
              <h2 className="text-xl font-extrabold text-[#ff5f2eca] sm:text-2xl">
                Unlock Insights with Our Robust{" "}
                <span className="bg-orange-800 px-2 text-[#fffbf3]">
                  Analytical Dashboard
                </span>
              </h2>
              <p className="text-lg font-medium text-gray-700 sm:text-xl">
                Experience the power of data-driven decision-making with our
                Analytical Dashboard
              </p>
              <div className="mt-2 flex flex-col gap-6">
                <span className="text-base sm:text-xl">
                  🚀 <span className="font-semibold">Insightful Data:</span>{" "}
                  Discover key metrics like votes, views, and engagement.
                </span>
                <span className="text-base sm:text-xl">
                  ➕ <span className="font-semibold">Visualize Data:</span> See
                  trends at a glance with interactive charts.
                </span>
                <span className="text-base sm:text-xl">
                  🏷️ <span className="font-semibold">Real-Time Updates:</span>{" "}
                  Stay current with live poll activity.
                </span>
                <span className="text-base sm:text-xl">and much more</span>
              </div>
            </div>
            <div className="self-center overflow-hidden rounded-3xl shadow-xl">
              {/* <img className="" src={createImg} alt="bg" /> */}
              <video width="350" controls autoPlay={true}>
                <source src={featureVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cta() {
  return (
    <div className="bg-[#fff4e1] py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4">
        <h1 className="mx-auto w-full text-center text-3xl font-extrabold sm:w-1/2 md:text-5xl">
          Empower Your Influence with Poll Share
        </h1>
        <p className="mx-auto my-10 mt-5 w-full text-center text-lg text-gray-700 sm:w-1/2 sm:text-xl">
          Seize Control of Your Polls, Understand Your Audience, and Analyze
          Stats with Ease
        </p>
        <Link
          to={"/create"}
          className="text-semibold mx-auto my-2 rounded-md bg-[#f25b2dca] px-4 py-2 text-lg text-white hover:bg-[#ff5f2eca] sm:px-6 sm:py-3 sm:text-xl"
        >
          Get Poll share
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-[#000000f4] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col justify-around gap-10 sm:flex-row sm:gap-0">
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold text-orange-200">
              Poll Share
            </h2>
            <p className="mt-2 w-[70%] text-gray-200">
              Your go-to platform for all polls related tasks
            </p>
            <span className="mt-4 text-sm text-gray-200">
              &copy; 2024 &#xb7; Poll Share
            </span>
            <div className="mt-4 w-2/3 text-gray-200">
              Hey I'm{" "}
              <a
                className="text-gray-100 underline"
                href="https://ritik-dev.vercel.app"
                target="_blank"
              >
                Ritik
              </a>
              , the creator of Poll share. Follow me for more project updates on{" "}
              <a
                className="text-gray-100 underline"
                href="https://linkedin.com/in/raj-ritik"
                target="_blank"
              >
                Linkedin
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="mb-2 font-semibold uppercase text-gray-200">
              Links
            </h2>
            <a href="/#" className="text-gray-100 hover:underline">
              About us
            </a>
            <a href="/#" className="text-gray-100 hover:underline">
              Need help
            </a>
            <a href="/#" className="text-gray-100 hover:underline">
              Pricing
            </a>
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
      <Cta />
      <Footer />
    </>
  );
}
