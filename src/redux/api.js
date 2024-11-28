import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUserPolls: builder.query({
      query: ({
        userId,
        search,
        q = "all",
        visibility = "all",
        limit = 10,
        offset = 0,
      }) =>
        `/user/poll/${userId}?q=${q}&visibility=${visibility}&limit=${limit}&offset=${offset}&search=${search}`,
    }),
    getUserVotedPolls: builder.query({
      query: ({
        userId,
        search,
        q = "all",
        visibility = "all",
        limit = 10,
        offset = 0,
      }) =>
        `/user/voted/${userId}?q=${q}&visibility=${visibility}&limit=${limit}&offset=${offset}&search=${search}`,
    }),
    getPolls: builder.query({
      query: ({ q = "all", visibility = "all", limit = 10, offset = 0 }) =>
        `/poll?q=${q}&visibility=${visibility}&limit=${limit}&offset=${offset}`,
    }),
    getTrendingPolls: builder.query({
      query: () => `/poll/trending`,
    }),
  }),
});

export { apiSlice };
export const {
  useGetUserPollsQuery,
  useGetUserVotedPollsQuery,
  useGetPollsQuery,
  useGetTrendingPollsQuery,
} = apiSlice;
