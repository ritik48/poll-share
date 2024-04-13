import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

export function PollPrivacyPopup({ setShowPrivacyPopup }) {
  const [pollPrivacy, setPollPrivacy] = useState(false);
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#fffbf3c5]">
      <div className="mt-[-150px] w-[500px] rounded-md border border-[#cac8c8] bg-[#fffbf3] px-6 py-4 shadow-2xl shadow-slate-400">
        <div className="flex justify-between">
          <div className="font-semibold">Poll Privacy</div>
          <button onClick={() => setShowPrivacyPopup(false)}>
            <IoCloseSharp size={25} />
          </button>
        </div>
        <div className="text-md mt-2 text-slate-700">
          {pollPrivacy
            ? "You have set your poll as private."
            : "Your poll is visible to everyone right now. \nUse the toggle button below to make it private or public"}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <label className="inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              name="status"
              id="status"
              value={pollPrivacy}
              onChange={(e) => setPollPrivacy(e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#ff5e2e] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
            <span className="ml-4">{pollPrivacy ? "Private" : "Public"}</span>
          </label>
          <button
            type="submit"
            className="w-fit rounded-md border bg-[#ff5e2e] px-2 py-2 text-sm text-white transition-all duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white"
          >
            Create Poll 🚀{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
