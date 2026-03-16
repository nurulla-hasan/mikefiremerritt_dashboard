import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";
import { buildQueryParams } from "@/lib/utils";

const reviewsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getAllReviews: builder.query({
      query: (query) => {
        const params = buildQueryParams(query);
        return {
          url: "/reviews/system",
          method: "GET",
          params: params,
        };
      },
      providesTags: [tagTypes.review],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const { useGetAllReviewsQuery, useDeleteReviewMutation } = reviewsApis;
