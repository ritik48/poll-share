export default function Header() {
  return (
    <div className="px-4 sm:px-10 py-4 sm:py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="text-2xl font-bold">Poll s.</div>
        <div className="items-start gap-10 hidden sm:flex">
          <span className="font-semibold text-[#464646]">
            Discover
          </span>
          <span className="font-semibold text-[#464646]">Create</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="rounded-md bg-[#ff5e2e] text-sm sm:text-lg px-4 py-1.5 font-semibold text-[#fffbf3]">
            Login
          </button>
          <button className="rounded-md border border-[#2d2b2a] text-sm sm:text-lg px-4 py-1.5 font-semibold ">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
