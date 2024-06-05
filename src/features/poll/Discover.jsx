import { useState } from "react";
import Countdown from "react-countdown";
import { GrFormNextLink } from "react-icons/gr";
import { Link, useLoaderData } from "react-router-dom";

import bg from "../../assets/Discover/pattern2.svg";

function timeLeft(publishedAt, expiresAt) {
  const d1 = new Date(publishedAt);
  const d2 = new Date(expiresAt);
  // console.log(d2.getTime() - d1.getTime());
  return d2.getTime();
}

function DiscoverPolls() {
  const { polls } = useLoaderData();
  const [pollStatus, setPollStatus] = useState("all");
  const [pollVisibility, setPollVisibility] = useState("all");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  function handleChangePollStatus(status) {
    setPollStatus(status);
    setPage(1);
  }
  function handleChangePollVisibility(status) {
    setPollVisibility((prevVisibility) =>
      prevVisibility === status ? "all" : status,
    );
    setPage(1);
  }

  function handleChangePage(currentPage) {
    if (currentPage < 1 || currentPage > 0) return;

    setPage(currentPage);
  }

  return (
    <div className="">
      <section className="relative bg-[#fff1ed98] py-20">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${bg})`,
            opacity: 0.8,
            zIndex: -1,
          }}
        ></div>
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="my-5 text-left text-3xl font-extrabold text-[black] md:text-5xl">
            Trending
          </h1>
          <div className="flex flex-col gap-4 md:flex-row">
            <div
              className="w-full cursor-pointer rounded-2xl border-2 border-gray-200 bg-[#fffbfb] p-4 shadow-md shadow-[#838383ca] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#ff5f2eca] md:w-1/2"
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
                    date={timeLeft(polls[1].publishedAt, polls[1].expiresAt)}
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
              className="w-full cursor-pointer rounded-2xl border-2 border-gray-200 bg-[#fffbfb] p-4 shadow-md shadow-[#838383ca] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[#ff5f2eca] md:w-1/2"
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
                    date={timeLeft(polls[1].publishedAt, polls[1].expiresAt)}
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
        </div>
      </section>

      <section className="">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-5 py-10">
            <h2 className="text-lg font-semibold uppercase">Explore</h2>
            <div className="my-2 flex flex-wrap gap-5">
              <select className=" rounded-md border border-[#dcdbdb] px-2 py-1.5 focus:outline-[#dcdbdb]">
                <option selected>Last 7 days</option>
                <option>Last 1 month</option>
                <option>All time</option>
              </select>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center overflow-hidden rounded-md border border-[#dcdbdb] bg-white px-1 py-1 shadow-sm sm:text-lg">
                  <div
                    onClick={() => handleChangePollStatus("all")}
                    className={`cursor-pointer rounded-md px-3 ${pollStatus === "all" && "bg-[#ff5f2eca] text-white"}`}
                  >
                    All
                  </div>
                  <div
                    onClick={() => handleChangePollStatus("active")}
                    className={`cursor-pointer rounded-md px-3 ${pollStatus === "active" && "bg-[#ff5f2eca] text-white"}`}
                  >
                    Active
                  </div>
                  <div
                    onClick={() => handleChangePollStatus("closed")}
                    className={`cursor-pointer rounded-md px-3 ${pollStatus === "closed" && "bg-[#ff5f2eca] text-white"}`}
                  >
                    Closed
                  </div>
                </div>
                <div className="flex justify-between ">
                  <div className="flex items-center overflow-hidden rounded-md border border-[#dcdbdb] bg-white px-1 py-1 shadow-sm sm:text-lg">
                    <div
                      onClick={() => handleChangePollVisibility("public")}
                      className={`cursor-pointer rounded-md px-3 ${pollVisibility === "public" && "bg-[#ff5f2eca] text-white"}`}
                    >
                      Public
                    </div>
                    <div
                      onClick={() => handleChangePollVisibility("private")}
                      className={`cursor-pointer rounded-md px-3 ${pollVisibility === "private" && "bg-[#ff5f2eca] text-white"}`}
                    >
                      Private
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-cols-auto-320 grid content-start gap-4">
              {polls.map((poll) => (
                <div
                  className="h-[150px] min-w-80 space-y-2 rounded-md border border-gray-200 bg-[#fffbfb] p-4 shadow-md shadow-[#b8b8b8]"
                  key={poll._id}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-1 flex items-center gap-2">
                      <img
                        className="h-6 w-6 rounded-full bg-blue-500 object-cover shadow-md"
                        src={`${poll.user.avatar}`}
                        alt="user"
                      />
                      <div className="text-[#383737]">{poll.user.name}</div>
                    </div>
                    <div className="text-lg font-semibold">{poll.title}</div>
                    <div className="mt-auto flex items-center gap-2">
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
      </section>
    </div>
  );
}

export { DiscoverPolls };
