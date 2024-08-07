import { Link } from "react-router-dom";

export default function Cta() {
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