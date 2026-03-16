import type { IDashboardResponse } from "@/types/dashboard.types";
import { baseApi } from "../../feature/baseApi";
import { tagTypes } from "../../tagTypes";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<IDashboardResponse, { earningsYear?: string; usersYear?: string }>({
      query: (params) => ({
        url: "/admin/dashboard-stats",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
