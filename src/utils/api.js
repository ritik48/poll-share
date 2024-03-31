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
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(`${BACKEND}/poll/${id}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();

  // votes percentage
  const { poll } = data;

  const totalVotes = Object.values(poll.votes).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  const votesPercent = {};
  for (let option in poll.votes) {
    votesPercent[option] = parseInt((poll.votes[option] / totalVotes) * 100);
  }

  return { poll: { ...poll, votes: votesPercent } };
};

export const addVote = async (id, choice) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const res = await fetch(`${BACKEND}/poll/vote/${id}?choice=${choice}`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
