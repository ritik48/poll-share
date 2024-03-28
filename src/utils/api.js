export const fetchPolls = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch("http://127.0.0.1:3000/poll", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
