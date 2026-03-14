import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";
import { buildQueryParams } from "@/lib/utils";

const faqApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaqs: builder.query({
      query: (query) => {
        const params = buildQueryParams(query);
        return {
          url: "/faqs",
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.faq],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faqs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faqs/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useGetAllFaqsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApis;
