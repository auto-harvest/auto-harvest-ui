import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAuthQuery } from "./baseQuery";

// Define the API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseAuthQuery("api/controller"),
  endpoints: (builder) => ({
    getControllers: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    setController: builder.mutation<
      { message: string; error: number },
      { name: string; code: string; location: string; capacity: number }
    >({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetControllersQuery, useSetControllerMutation } = apiSlice;
