/* eslint-disable no-unused-vars */
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
import { IoCloseSharp } from "react-icons/io5";

import { useMultiInput } from "../../hooks/useMultiInputController";
import { PollPrivacyPopup } from "./PollPrivacyPopup";

function OptionInput({ id, onRemoveInputs }) {
  return (
    <div className="flex items-center gap-4">
      <input
        name={`option${id}`}
        placeholder={`Option`}
        className="w-full rounded-md border border-[#d2d0d0] px-4 py-2 text-xl outline-none ring-blue-200 placeholder:text-lg placeholder:font-normal placeholder:text-[#908e8e] focus:border-blue-200 focus:ring"
      />
      {id > 2 && (
        <button type="click" onClick={(e) => onRemoveInputs(id)}>
          <MdDelete size={25} color="" cursor={"pointer"} />
        </button>
      )}
    </div>
  );
}

function CategoryInput({ id, category, onRemoveCategory }) {
  return (
    <div className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-[#bdbdbd] bg-[#efeeee] px-2 py-0.5 shadow-md transition-all duration-300 hover:bg-[#373737] hover:text-[white]">
      <input
        className="hidden"
        defaultValue={category}
        name={`category${id}`}
      />
      <div>{category}</div>
      <button type="button" onClick={() => onRemoveCategory(id)}>
        <IoCloseSharp />
      </button>
    </div>
  );
}

export function Create() {
  const {
    multiInputs: optionInputs,
    removeInputs: removeOption,
    addInputs: addOption,
  } = useMultiInput({
    1: <OptionInput id={1} key={1} />,
    2: <OptionInput id={2} key={2} />,
  });

  const {
    multiInputs: categoryInputs,
    removeInputs: removeCategory,
    addInputs: addCategory,
  } = useMultiInput(null);

  const [showPrivacyPopup, setShowPrivacyPopup] = useState(false);
  const [category, setCategory] = useState("");

  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // show toast after submitting the poll
  useEffect(() => {
    if (errors?.error) {
      toast(errors.error);
    }
    if (errors && !errors.success) {
      toast(errors.message);
    }
  }, [errors]);


  function handleAddOption() {
    const id = Date.now();
    addOption(<OptionInput key={id} id={id} onRemoveInputs={removeOption} />);
  }

  function handleAddCategory(category) {
    const id = Date.now();
    addCategory(
      <CategoryInput
        key={id}
        id={id}
        category={category}
        onRemoveCategory={removeCategory}
      />,
    );
  }

  function handleCategoryInput(e) {
    const input = e.target.value;

    if (input.length < 2 && input.substr(-1) === ",") {
      setCategory("");
    } else if (input.substr(-1) === ",") {
      handleAddCategory(input.slice(0, -1));
      setCategory("");
    } else {
      setCategory(input);
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-6xl pt-28">
        {isSubmitting && (
          <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
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
            {showPrivacyPopup && (
              <PollPrivacyPopup setShowPrivacyPopup={setShowPrivacyPopup} />
            )}
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
                onClick={handleAddOption}
                className="text-x w-fit rounded-md border border-[#ff5e2e] px-4 py-2 transition-all duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white"
              >
                Add option ➕
              </button>
            </div>
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {categoryInputs &&
                  Object.entries(categoryInputs).map((c) => c[1])}
              </div>
              <input
                value={category}
                onChange={handleCategoryInput}
                placeholder="Enter category seaparated by comma"
                className="placeholder:font-thi w-full rounded-md border border-[#d2d0d0] px-4 py-2 text-lg outline-none ring-blue-200 placeholder:text-lg placeholder:text-[#908e8e] focus:border-blue-200 focus:ring"
              />
            </div>
            <button
              onClick={() => setShowPrivacyPopup(true)}
              type="button"
              className="text-x w-fit rounded-md border bg-[#ff5e2e] px-4 py-2 text-white transition-all duration-300 ease-in-out hover:border-black hover:bg-black hover:text-white"
            >
              Next step
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
  console.log(data);
  const { date, time } = data;

  if (!date || !time) return { error: "Please provide date and time" };

  const dateTimeString = `${date}T${time}`;
  const dateTimeObject = new Date(Date.parse(dateTimeString)).toString();

  const pollData = {
    title: data.title,
    status: data.status === true,
    options: [],
    category: [],
    expiresAt: dateTimeObject,
  };
  for (let key in data) {
    if (key.includes("option") && data[key].length !== 0) {
      pollData.options.push(data[key]);
    }
  }

  for (let key in data) {
    if (key.includes("category") && data[key].length !== 0) {
      pollData.category.push(data[key]);
    }
  }
  console.log(pollData)
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
