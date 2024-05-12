const BACKEND = "http://127.0.0.1:3000";

// GET ALL POLLS
export const fetchAllPolls = async () => {
  const res = await fetch(`${BACKEND}/poll`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

// GET POLL BY ID
export const fetchPoll = async (id) => {
  const res = await fetch(`${BACKEND}/poll/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();

  const { polls } = data;

  // GET TOTAL VOTES
  console.log(polls);
  const totalVotes = Object.values(polls.formattedVote).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  // FIND PERCENT OF VOTES FOR EACH OPTION
  const votesPercent = {};
  for (let option in polls.formattedVote) {
    votesPercent[option] = parseInt(
      (polls.formattedVote[option] / totalVotes) * 100,
    );
  }

  return {
    poll: {
      ...polls,
      votes: votesPercent,
      totalVotes,
    },
  };
};

// GET ALL POLLS USER interacted
export const fetchUserPoll = async (userVotes) => {
  const promises = userVotes.map((vote) => fetchPoll(vote.poll_id));
  const pollData = await Promise.all(promises);

  const data = userVotes.map((vote, index) => {
    return {
      poll: pollData[index].poll,
      choice: pollData[index].poll["options"][vote.poll_choice],
    };
  });

  return data;
};

// ADD VOTE TO A POLL
export const addVote = async (id, choice) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(`${BACKEND}/poll/vote/${id}?choice=${choice}`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

// CREATE A NEW POLL
export const createPoll = async (pollData) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const res = await fetch(`${BACKEND}/poll/new`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pollData),
  });

  const data = await res.json();

  return data;
};

// DELETE POLL
export const deletePoll = async (id) => {
  const res = await fetch(`${BACKEND}/poll/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();
  return data;
};

// GET POLLS CREATED BY A USER
export const fetchPollsCreatedByUser = async (id) => {
  const res = await fetch(`${BACKEND}/user/poll/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);

  const modifiedPolls = data.polls.map((poll) => {
    const totalVotes = Object.values(poll.formattedVote).reduce(
      (prev, cur) => parseInt(cur) + prev,
      0,
    );
    console.log(poll);
    console.log(totalVotes);
    return { ...poll, totalVotes };
  });

  return { polls: modifiedPolls };
};
