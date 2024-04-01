import { useState } from "react";
import { Form } from "react-router-dom";

function OptionInput({ value }) {
  return (
    <input
      name={`option${value}`}
      placeholder={`Option ${value}`}
      className="w-full rounded-md border border-[#8d8b8b] px-4 py-2 text-xl outline-none ring-blue-200 placeholder:text-lg placeholder:font-normal placeholder:text-[#908e8e] focus:border-blue-200 focus:ring"
    />
  );
}

export function Create() {
  const [optionInputs, setOptionsInputs] = useState([
    <OptionInput value="1" />,
    <OptionInput value="2" />,
  ]);

  function handleAddInputs() {
    const totalInputs = optionInputs.length;
    setOptionsInputs((prev) => [
      ...prev,
      <OptionInput value={totalInputs + 1} />,
    ]);
  }

  return (
    <div>
      <div className="mx-auto max-w-6xl pt-32">
        <div className="mx-auto w-3/5 ">
          {" "}
          <div className="mb-4 text-4xl">Create Poll</div>
          <Form method="POST" className="space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Poll Title</label>
              <input
                id="title"
                name="title"
                placeholder="What's the poll about ?"
                className="w-full rounded-md border border-[#8d8b8b] px-4 py-2 text-xl outline-none ring-blue-200 placeholder:text-lg placeholder:font-normal placeholder:text-[#908e8e] focus:border-blue-200 focus:ring"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Options</label>
              {optionInputs.map((option) => option)}
              <button
                type="button"
                onClick={handleAddInputs}
                className="text-x w-fit rounded-md border border-[#ff5e2e] px-4 py-2 transition-all duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white"
              >
                Add option ➕
              </button>
            </div>
            <button className="text-x w-fit rounded-md border bg-[#ff5e2e] px-4 py-2 text-white transition-all duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white">
              Create Poll 🚀{" "}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function createPollAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const pollData = { title: data.title, options: [] };
  for (let key in data) {
    if (key.includes("option")) {
      pollData.options.push(data[key]);
    }
  }

  console.log(pollData);

  return null;
}
