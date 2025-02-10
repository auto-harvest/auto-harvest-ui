import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAuthQuery } from "./baseQuery";

// Define the API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseAuthQuery("api"),
  endpoints: (builder) => ({
    getTest: builder.query({
      query: (token) => ({
        url: "/test",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    postTest: builder.mutation({
      query: ({ data, token }) => ({
        url: "/test",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetTestQuery, usePostTestMutation } = apiSlice;
