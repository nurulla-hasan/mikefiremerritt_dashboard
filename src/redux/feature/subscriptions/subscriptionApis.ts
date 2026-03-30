
import { tagTypes } from "../../tagTypes";
import { baseApi } from "../baseApi";

export const subscriptionApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllSubscriptions: builder.query({
      query: (params) => ({
        url: "/subscription-order",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.subscription],
    }),

  }),
});

export const { 
  useGetAllSubscriptionsQuery,
  useLazyGetAllSubscriptionsQuery
} = subscriptionApis;
