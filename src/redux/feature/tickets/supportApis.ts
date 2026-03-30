import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";
import { buildQueryParams } from "@/lib/utils";

const supportApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        getAllSupportTickets: builder.query({
            query: (query) => {
                const params = buildQueryParams(query);
                return {
                    url: "/support/all-tickets",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [tagTypes.support],
        }),

        replyToSupportTicket: builder.mutation({
            query: ({ id, data }) => ({
                url: `/support/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: [tagTypes.support],
        }),

    }),
});

export const {
    useGetAllSupportTicketsQuery,
    useLazyGetAllSupportTicketsQuery,
    useReplyToSupportTicketMutation,
} = supportApis;
