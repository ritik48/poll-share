import { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import { createPoll } from "../../utils/api";
import { MdDelete } from "react-icons/md";

function OptionInput({ value, onRemoveInputs }) {
  return (
    <div className="flex items-center gap-4">
      <input
        name={`option${value}`}
        placeholder={`Option`}
        className="w-full rounded-md border border-[#d2d0d0] px-4 py-2 text-xl outline-none ring-blue-200 placeholder:text-lg placeholder:font-normal placeholder:text-[#908e8e] focus:border-blue-200 focus:ring"
      />
      {value > 2 && (
        <button type="click" onClick={(e) => onRemoveInputs(e, value)}>
          <MdDelete size={25} color="" cursor={"pointer"} />
        </button>
      )}
    </div>
  );
}

export function Create() {
  const [optionInputs, setOptionsInputs] = useState({
    1: <OptionInput value="1" key={1} />,
    2: <OptionInput value="2" key={2} />,
  });

  const errors = useActionData();

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (errors?.error) {
      toast(errors.error);
    }
    if (errors && !errors.success) {
      toast(errors.message);
    }
  }, [errors]);

  function handleRemoveInputs(e, id) {
    e.preventDefault();
    setOptionsInputs((prev) => {
      const d = Object.keys(prev).reduce((acc, key) => {
        if (key !== id.toString()) acc[key] = prev[key];
        return acc;
      }, {});

      console.log(d);
      return d;
    });
  }

  function handleAddInputs() {
    const totalInputs = Date.now();
    setOptionsInputs((prev) => {
      return {
        ...prev,
        [totalInputs]: (
          <OptionInput
            key={totalInputs}
            value={totalInputs}
            onRemoveInputs={handleRemoveInputs}
          />
        ),
      };
    });
  }

  return (
    <div>
      <div className="mx-auto max-w-6xl pt-32">
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="loader"></span>
              <div className="text-3xl font-semibold">
                Creating your poll ...
              </div>
            </div>
          </div>
        )}
        <div className="mx-auto w-3/5 ">
          {" "}
          <div className="mb-4 text-4xl">Create Poll</div>
          <Form method="POST" className="space-y-4" replace>
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Poll Title</label>
              <input
                id="title"
                name="title"
                placeholder="What's the poll about ?"
                className="w-full rounded-md border border-[#d2d0d0] px-4 py-2 text-xl outline-none ring-blue-200 placeholder:text-lg placeholder:font-normal placeholder:text-[#908e8e] focus:border-blue-200 focus:ring"
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Expires On</label>
              <div className="rounded-md border border-slate-300 px-2 py-1">
                <input name="date" type="date" className="outline-none" />
              </div>
              <div className="rounded-md border border-slate-300 px-2 py-1">
                <input name="time" type="time" className="outline-none" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label>Options</label>
              {Object.entries(optionInputs).map((option) => option[1])}
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

  const { date, time } = data;

  if (!date || !time) return { error: "Please provide date and time" };

  const dateTimeString = `${date}T${time}`;
  const dateTimeObject = new Date(Date.parse(dateTimeString)).toString();

  const pollData = {
    title: data.title,
    options: [],
    expiresAt: dateTimeObject,
  };
  for (let key in data) {
    if (key.includes("option") && data[key].length !== 0) {
      pollData.options.push(data[key]);
    }
  }

  if (!pollData.title || pollData.options.length < 2) {
    return { error: "Please provide all the data to create poll" };
  }

  const resData = await createPoll(pollData);
  console.log("poll data = ", resData);
  if (resData.success) {
    return redirect(`/poll/${resData.poll._id}`);
  }
  return resData;
}
