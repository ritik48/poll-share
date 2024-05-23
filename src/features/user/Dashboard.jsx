import { FaPoll } from "react-icons/fa";
import { FcBarChart } from "react-icons/fc";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FcDocument } from "react-icons/fc";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect } from "react";
import { getUserStats } from "../../utils/api";
import { defer, useLoaderData } from "react-router-dom";

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
  // shadow-[0_3px_10px_rgb(0,0,0,0.2)]
  return (
    <div className="rounded-2xl rounded-t-none border border-t-0 border-[#d0d0d0] bg-[white] px-4 py-4">
      <AreaChart
        width={700}
        height={250}
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
            backgroundColor: "white",
            color: "black",
            borderRadius: "6px",
            fontSize: "16px",
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

export function Dashboard() {
  const { data } = useLoaderData();

  return (
    <div className="mx-auto w-[90%] bg-[#f9f9f9] px-6 py-6">
      <div className="flex gap-4">
        <div className="flex flex-grow flex-col">
          <div className="flex w-full">
            <div className="flex w-full items-center gap-8 rounded-md rounded-b-none rounded-tr-none border border-b-0 border-t-[3px] border-[#d0d0d0] border-t-orange-500 bg-white px-8 py-4">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-extrabold  text-[#474747]">
                  Votes
                </div>
                <div className="flex items-center gap-2 text-2xl font-normal">
                  {data.totalVotes} <FaCircleArrowUp size={19} color="green" />
                </div>
              </div>
              <FcBarChart size={25} />
            </div>
            <div className="flex w-full items-center gap-8 rounded-md rounded-b-none rounded-t-none border border-b-0 border-l-0  border-[#d0d0d0]  bg-white px-8 py-4">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-extrabold  text-[#474747]">
                  Views
                </div>
                <div className="flex items-center gap-2 text-2xl font-normal">
                  {data.totalViews} <FaCircleArrowUp size={19} color="green" />
                </div>
              </div>
              <FaPoll size={25} />
            </div>
            <div className="flex w-full items-center gap-8 rounded-md rounded-b-none rounded-tl-none border border-b-0 border-l-0  border-[#d0d0d0]  bg-white px-8 py-4">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-extrabold  text-[#474747]">
                  Polls
                </div>
                <div className="text-2xl font-normal">{data.totalPolls}</div>
              </div>
              <FcDocument size={25} />
            </div>
          </div>
          <Chart />
        </div>
        <div className="w-72 rounded-md border border-[#d0d0d0] bg-white px-4 py-4 shadow-sm">
          <div className="border-b pb-4">
            <div className="font-semibold">Realtime</div>
            <div className="text-sm text-[#6f6f6f]">Updating live</div>
          </div>
          <div className="border-b py-4">
            <div className="font-semibold">1024</div>
            <div className="text-sm text-[#6f6f6f]">Votes</div>
          </div>
          <div className="border-b py-4">
            <div className="font-semibold">2014</div>
            <div className="text-sm text-[#6f6f6f]">
              Views &#xb7; Last 48 hours
            </div>
          </div>
          <div className="space-y-2 py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm text-[#6f6f6f]">Your recent polls</div>
              <div className="text-sm text-[#6f6f6f]">Views</div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <div>What is you favourite color</div>
                <div>25</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Best frontend framwork</div>
                <div>489</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function dashboardLoader() {
  const data = await getUserStats();

  return data;
}
