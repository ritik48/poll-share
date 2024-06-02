import { FaPoll } from "react-icons/fa";
import { FcBarChart } from "react-icons/fc";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FcDocument } from "react-icons/fc";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getUserStats } from "../../utils/api";
import { useLoaderData } from "react-router-dom";
import { formattedDate } from "../../utils/helper";

function Chart({ data }) {
  let chart_data = data.map((d) => ({
    day: formattedDate(d.day, "d-m"),
    vote: d.votes.length,
  }));

  return (
    <div className="h-[400px] flex-grow rounded-2xl border border-[#d0d0d0] bg-[white] py-4 pb-14">
      <div className="my-2 flex items-center gap-2 pr-6">
        <div className="ml-auto flex justify-between ">
          <select className=" focus:outline-[#dcdbdb] py-1.5 px-2 rounded-md border border-[#dcdbdb]">
            <option selected>Last 7 days</option>
            <option>Last 1 month</option>
            <option>All time</option>
          </select>
        </div>
      </div>
      <ResponsiveContainer width={"95%"}>
        {" "}
        <AreaChart
          data={chart_data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorVote" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff884d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff884d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            axisLine={false}
            dataKey="day"
            fontSize={12}
            tickLine={false}
          />
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
      </ResponsiveContainer>
    </div>
  );
}

export function Dashboard() {
  const { data, chart_data } = useLoaderData();

  return (
    <div className="mx-auto w-[90%] bg-[rgb(249,249,249)] px-6 py-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-grow flex-col gap-5">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-grow flex-wrap items-center gap-8 rounded-md border border-t-[3px] border-[#d0d0d0] border-t-orange-500 bg-white px-8 py-4">
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
            <div className="flex flex-grow flex-wrap items-center gap-8 rounded-md border  border-[#d0d0d0]  bg-white px-8 py-4">
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
            <div className="flex flex-grow flex-wrap items-center gap-8 rounded-md border  border-[#d0d0d0]  bg-white px-8 py-4">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-extrabold  text-[#474747]">
                  Polls
                </div>
                <div className="text-2xl font-normal">{data.totalPolls}</div>
              </div>
              <FcDocument size={25} />
            </div>
          </div>
          <Chart data={chart_data} />
        </div>
        <div className="max-w-72 self-start rounded-md border border-[#d0d0d0] bg-white px-4 py-4 shadow-sm">
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
