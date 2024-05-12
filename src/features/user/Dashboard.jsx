import { GrFormNextLink } from "react-icons/gr";
import { Link, useLoaderData } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { IoTrendingUpSharp } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { LiaPollSolid } from "react-icons/lia";
// import { SiTicktick } from "react-icons/si";
import {
  FcLineChart,
  FcComboChart,
  FcElectricalSensor,
  FcSportsMode,
} from "react-icons/fc";
import { FcBarChart } from "react-icons/fc";
import { CiBookmarkPlus } from "react-icons/ci";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { fetchPollsCreatedByUser } from "../../utils/api";
import store from "../../../store";
import requireAuth from "../../utils/requireAuth";

export function Dashboard() {
  const { polls } = useLoaderData();
  console.log(polls);
  // background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
  return (
    <div className="bg-[#f9f9f9] px-4 py-3">
      {/* <Chart /> */}
      <Table polls={polls} />
      <button className="my-6 rounded-md border border-[#b7b6b6] px-4 py-1">
        Last 7 Days
      </button>
      <Chart />
    </div>
  );
}

export async function DashboardLoader({ request }) {
  await requireAuth(request, true);
  const userInfo = { ...store.getState().user.user };

  const polls = await fetchPollsCreatedByUser(userInfo._id);

  console.log(polls);

  return polls;
}

{
  /* <div>
            <h2 className="text-2xl font-semibold">Stats</h2>
            <div className="mt-4 flex gap-4">
              <div className="flex w-44 flex-col gap-1 rounded-md border border-[#f0eeee] bg-white p-6 shadow-md shadow-[#e2e1e1]">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-semibold text-[#686868]">
                    Total Votes
                  </div>
                  <FcBarChart size={25} />
                </div>
                <div className="text-2xl font-bold">+430</div>
              </div>
              <div className="flex w-44 flex-col gap-1 rounded-md border border-[#f0eeee] bg-white p-6 shadow-md shadow-[#e2e1e1]">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-semibold text-[#686868]">
                    Active Votes
                  </div>
                  <FcElectricalSensor size={25} />
                </div>
                <div className="text-2xl font-bold">+150</div>
              </div>
              <div className="flex w-44 flex-col gap-1 rounded-md border border-[#f0eeee] bg-white p-6 shadow-md shadow-[#e2e1e1]">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-semibold text-[#686868]">
                    Audience reached
                  </div>
                  <FcSportsMode size={25} />
                </div>
                <div className="text-2xl font-bold">+1240</div>
              </div>
            </div>
          </div> */
}

{
  /* <div className="mt-4 flex flex-wrap gap-3">
              {polls.map((poll) => (
                <div
                  className="min-w-40 space-y-2 rounded-md border border-gray-200 bg-[#fcf9f9] px-3 py-2 shadow-sm"
                  key={poll._id}
                >
                  <div>
                    <div className="text-md font-semibold">{poll.title}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="text-md text-gray-600">3h ago</div>
                      <Link className="ml-auto">
                        <MdDelete size={18} />
                      </Link>
                      <Link
                        to={`poll/${poll._id}`}
                        className="rounded-md border border-[#c4c4c4] px-2 transition-all duration-300 hover:bg-[#222121] hover:text-[#d0cfcf] "
                      >
                        <GrFormNextLink size={25} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div> */
}

const formattedDate = (dateString) => {
  const date = new Date(dateString);

  const options = { weekday: "long", day: "2-digit", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

function Table({ polls }) {
  return (
    <div class="relative mt-2 bg-white py-2 shadow-md sm:rounded-lg">
      <div class="flex items-center gap-4 pb-4">
        <div class="relative pl-2">
          <div class="rtl:inset-r-0 pointer-events-none absolute inset-y-0 left-2 flex items-center ps-3 rtl:right-0">
            <svg
              class="h-5 w-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            class="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search for items"
          />
        </div>
        <button className="rounded-md border border-[#b7b6b6] px-2 py-1">
          Active Polls
        </button>
        <button className="rounded-md border border-[#b7b6b6] px-2 py-1">
          Closed Polls
        </button>
        <div className="ml-auto mr-10 w-fit rounded-md border border-[#878787] bg-[#220a03] px-2 py-1 text-[#e6e3e3] ">
          Total Results: {polls.length}
        </div>
      </div>
      <div className="max-h-[240px] overflow-x-auto">
        <table class="border-red w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead class="sticky top-0 bg-gray-500 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-[#e3e3e3]">
              <th scope="col" class="px-6 py-3">
                Poll title
              </th>
              <th scope="col" class="px-6 py-3">
                Published on
              </th>
              <th scope="col" class="px-6 py-3">
                Votes
              </th>
              <th scope="col" class="px-6 py-3">
                Views
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {polls?.map((poll) => (
              <tr
                key={poll.id}
                class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-semibold text-gray-900 dark:text-white"
                >
                  <Link to={`/poll/${poll.id}`}>{poll.title}</Link>
                </th>
                <td class="px-6 py-4">{formattedDate(poll.publishedAt)}</td>
                <td class="px-6 py-4">{poll.totalVotes || "0"}</td>
                <td class="px-6 py-4">{"soon"}</td>
                <td class="flex gap-4 px-6 py-4">
                  <Link className="text-black hover:text-[#ff7653]">
                    <LiaEdit size={20} />
                  </Link>
                  <Link className="text-black hover:text-[#ff6d50]">
                    <MdDelete size={20} />
                  </Link>
                </td>
              </tr>
            ))}

            {/* <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-semibold text-gray-900 dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td class="px-6 py-4">White</td>
              <td class="px-6 py-4">Laptop PC</td>
              <td class="px-6 py-4">$1999</td>
              <td class="flex gap-4 px-6 py-4">
                <Link className="text-black hover:text-[#ff7653]">
                  <LiaEdit size={20} />
                </Link>
                <Link className="text-black hover:text-[#ff6d50]">
                  <MdDelete size={20} />
                </Link>
              </td>
            </tr>
            <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-semibold text-gray-900 dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">Black</td>
              <td class="px-6 py-4">Accessories</td>
              <td class="px-6 py-4">$99</td>
              <td class="flex gap-4 px-6 py-4">
                <Link className="text-black hover:text-[#ff7653]">
                  <LiaEdit size={20} />
                </Link>
                <Link className="text-black hover:text-[#ff6d50]">
                  <MdDelete size={20} />
                </Link>
              </td>
            </tr>

            <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
              <th
                scope="row"
                class="whitespace-nowrap px-6 py-4 font-semibold text-gray-900 dark:text-white"
              >
                Apple Watch
              </th>
              <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4">Accessories</td>
              <td class="px-6 py-4">$179</td>
              <td class="flex gap-4 px-6 py-4">
                <Link className="text-black hover:text-[#ff7653]">
                  <LiaEdit size={20} />
                </Link>
                <Link className="text-black hover:text-[#ff6d50]">
                  <MdDelete size={20} />
                </Link>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Chart() {
  const data = [
    {
      name: "April 8",
      vote: 2,
    },
    {
      name: "April 9",
      vote: 8,
    },
    {
      name: "April 10",
      vote: 30,
    },
    {
      name: "April 11",
      vote: 25,
    },
    {
      name: "April 12",
      vote: 70,
    },
    {
      name: "April 13",
      vote: 94,
    },
    {
      name: "April 14",
      vote: 186,
    },
  ];
  return (
    <div className="w-fit rounded-2xl bg-[white] px-4 py-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {/* <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f6f0e0f1" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f6f0e0f1" stopOpacity={0} />
          </linearGradient> */}
          <linearGradient id="colorVote" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff884d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ff884d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis axisLine={false} dataKey="name" fontSize={12} tickLine={false} />
        <YAxis axisLine={false} fontSize={12} tickLine={false} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          contentStyle={{
            backgroundColor: "black",
            color: "wheat",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bolder",
          }}
          itemStyle={{ fontSize: "14px" }}
        />

        <Area
          type="monotone"
          dataKey="vote"
          stroke="#e39309"
          fillOpacity={1}
          fill="url(#colorVote)"
        />
      </AreaChart>
    </div>
  );
}
