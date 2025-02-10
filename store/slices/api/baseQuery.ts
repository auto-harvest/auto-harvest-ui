import { environment } from "@/environment/environment";
import { RootState } from "@/store/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logout } from "../persist/authSlice";

export const baseAuthQuery = (prefix: string) =>
  fetchBaseQuery({
    baseUrl: `${environment.apiBaseUrl}/${prefix}`,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
const baseQueryWithReauth =
  (prefix: string) => async (args: any, api: any, extraOptions: any) => {
    let result = await baseAuthQuery(prefix)(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      console.warn("Token expired, logging out...");
      api.dispatch(logout());
    }

    return result;
  };
