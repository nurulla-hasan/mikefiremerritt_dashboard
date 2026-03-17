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
  }),
});

export const {
  useGetAllPricingRulesQuery,
  useAddPricingRuleMutation,
  useDeletePricingRuleMutation,
} = pricingRuleApis;
