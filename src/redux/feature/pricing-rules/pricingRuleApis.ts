import { baseApi } from "../baseApi";
import { tagTypes } from "../../tagTypes";

export const pricingRuleApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllPricingRules: builder.query({
      query: (params) => ({
        url: "/subscription-pricing-rules",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.pricingRule],
    }),

    addPricingRule: builder.mutation({
      query: (data) => ({
        url: "/subscription-pricing-rules",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.pricingRule],
    }),
    
    deletePricingRule: builder.mutation({
      query: (id) => ({
        url: `/subscription-pricing-rules/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.pricingRule],
    }),

    getAllSubscriptionPlans: builder.query({
      query: () => ({
        url: "/subscription-plans",
        method: "GET",
      }),
      providesTags: [tagTypes.pricingRule],
    }),

    updateSubscriptionPlan: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subscription-plans/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.pricingRule],
    }),
  }),
});

export const {
  useGetAllPricingRulesQuery,
  useAddPricingRuleMutation,
  useDeletePricingRuleMutation,
  useGetAllSubscriptionPlansQuery,
  useUpdateSubscriptionPlanMutation,
} = pricingRuleApis;
