// store/slices/api/authApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, LoginResponse, SignupResponse } from "./types";
import { environment } from "@/environment/environment";

// Define the base query with the API URL
const baseQuery = fetchBaseQuery({
  baseUrl: environment.apiBaseUrl,
});

// Define the API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: "/auth/login",
          method: "POST",
          body: credentials,
        }),
      }
    ),
    signup: builder.mutation<
      SignupResponse,
      { username: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useLoginMutation, useSignupMutation } = authApi;
