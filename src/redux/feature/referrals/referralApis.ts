import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const referralApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReferralReward: builder.query({
      query: () => ({
        url: "/referral-reward-settings",
        method: "GET",
      }),
      providesTags: [tagTypes.referral],
    }),
    updateReferralReward: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/referral-reward-settings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.referral],
    }),
  }),
});

export const { useGetReferralRewardQuery, useUpdateReferralRewardMutation } = referralApis;
