const BACKEND = "http://127.0.0.1:3000";
export const fetchAllPolls = async () => {
  const res = await fetch(`${BACKEND}/poll`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

export const fetchPoll = async (id) => {
  // await new Promise((resolve) => setTimeout(resolve, 200));
  const res = await fetch(`${BACKEND}/poll/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();

  // votes percentage
  const { polls } = data;

  const totalVotes = Object.values(polls.formattedVote).reduce(
    (acc, curr) => acc + curr,
    0,
  );

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

export const addVote = async (id, choice) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(`${BACKEND}/poll/vote/${id}?choice=${choice}`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};

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

export const deletePoll = async (id) => {
  const res = await fetch(`${BACKEND}/poll/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();
  return data;
};
