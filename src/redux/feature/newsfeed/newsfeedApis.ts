import { buildQueryParams } from "@/lib/utils";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";

const newsfeedApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllNewsfeeds: builder.query({
            query: (query) => {
                const params = buildQueryParams(query);
                return {
                    url: "/admin/posts",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [tagTypes.newsfeed],
        }),

        updateNewsfeedStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/posts/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: [tagTypes.newsfeed],
        }),

    }),
});

export const {
    useGetAllNewsfeedsQuery,
    useUpdateNewsfeedStatusMutation,
} = newsfeedApis;
