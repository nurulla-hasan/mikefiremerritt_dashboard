/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";
import type { TNotification } from "@/types/notification";

export const notificationApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<{ data: TNotification[] }, void>({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
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
  useMarkAsReadMutation,
  useMarkSingleAsReadMutation,
  useClearAllNotificationsMutation,
} = notificationApis;
