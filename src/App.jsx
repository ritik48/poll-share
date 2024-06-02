import Header from "./ui/Header";

export function Hero() {
  return (
    <div className="flex h-screen items-center px-4 sm:px-10">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8">
        <img
          src="/assets/bg-images/poll.png"
          className="absolute left-0 top-[3rem] w-10 opacity-65 sm:top-0 sm:w-10 sm:opacity-100 lg:w-14"
          alt="icon"
        />
        <img
          src="/assets/bg-images/polling.png"
          className="absolute bottom-1/3 right-20 w-10 sm:w-10 lg:w-14"
          alt="icon"
        />
        <img
          src="/assets/bg-images/rate.png"
          className="absolute right-0 top-[-80px] w-10 sm:w-10 lg:w-14"
          alt="icon"
        />
        <h1 className="text-center text-4xl font-extrabold md:text-7xl">
          Shaping Opinions Together
        </h1>
        <div className="mx-auto text-center text-lg leading-[1.6] text-slate-600 sm:w-3/5 md:text-2xl md:leading-[2.6rem]">
          <span className="m-2 rounded-full border border-yellow-800 bg-yellow-500 px-2 py-[0.1rem] text-[#fffbf3] sm:px-4 sm:py-1">
            Create
          </span>{" "}
          polls to spark discussion,{" "}
          <span className="m-2 rounded-full border border-slate-900 bg-[#ff5f2eca] px-2 py-[0.1rem] text-[#fffbf3] sm:px-4 sm:py-1">
            discover
          </span>{" "}
          insights, and{" "}
          <span className="m-2 rounded-full border border-slate-900 bg-[#2e43ffaa] px-2 py-[0.1rem] text-[#fffbf3] sm:px-4 sm:py-1">
            Share
          </span>
          your vision with the world.
        </div>
        <a
          href="#polls"
          className="mt-5 rounded-full border border-slate-700 px-10 py-2"
        >
          Explore
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <Hero />
      </div>
    </>
  );
}

export default App;
