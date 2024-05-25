import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:3000", credentials: "include" }),
  endpoints: (builder) => ({
    getUserPolls: builder.query({
      query: ({userId, q="all", visibility="all"}) => `/user/poll/${userId}?q=${q}&visibility=${visibility}`,
    }),
  }),
});

export { apiSlice };
export const { useGetUserPollsQuery } = apiSlice;
