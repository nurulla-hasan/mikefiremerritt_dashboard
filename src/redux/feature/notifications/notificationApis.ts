/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";
import type { TNotification } from "@/types/notification";

import { buildQueryParams } from "@/lib/utils";

export const notificationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<{ data: TNotification[] }, void>({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),
    getMyNotifications: builder.query({
      query: (query) => {
        const params = buildQueryParams(query);
        return {
          url: "/notification/admin-notifications",
          method: "GET",
          params: params,
        };
      },
      providesTags: [tagTypes.notification],
    }),
    markAsRead: builder.mutation<any, void>({
      query: () => ({
        url: "/notifications/read",
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    markSingleAsRead: builder.mutation<any, string>({
      query: (id) => ({
        url: `/notifications/read/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    markAsReadAdmin: builder.mutation({
      query: (id) => ({
        url: `/notification/mark-as-read/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    markAllAsReadAdmin: builder.mutation({
      query: () => ({
        url: "/notification/mark-as-read",
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
    clearAllNotifications: builder.mutation<any, void>({
      query: () => ({
        url: "/notifications/clear-all",
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetMyNotificationsQuery,
  useMarkAsReadMutation,
  useMarkSingleAsReadMutation,
  useMarkAsReadAdminMutation,
  useMarkAllAsReadAdminMutation,
  useClearAllNotificationsMutation,
} = notificationApis;
