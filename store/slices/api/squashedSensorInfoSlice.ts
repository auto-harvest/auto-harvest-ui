import { createApi } from "@reduxjs/toolkit/query/react";
import { baseAuthQuery } from "./baseQuery";

// Define the API slice
export const squashedSensorInfoSlice = createApi({
  reducerPath: "logs",
  baseQuery: baseAuthQuery("api/logs"),
  endpoints: (builder) => ({
    getHistoricSensorInfo: builder.query({
      query: ({
        type,
        range,
        start,
      }: {
        type: string;
        range: string;
        start: string;
      }) => ({
        url: `?type=${type}&range=${range}&start=${start}`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetHistoricSensorInfoQuery } = squashedSensorInfoSlice;
