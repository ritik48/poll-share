const formattedDate = (dateString, format) => {
  const date = new Date(dateString);

  const options =
    format === "d-m"
      ? { month: "short", day: "2-digit" }
      : { weekday: "long", day: "2-digit", month: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export { formattedDate };
