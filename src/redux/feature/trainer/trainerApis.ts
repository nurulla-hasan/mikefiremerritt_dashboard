import { buildQueryParams } from "@/lib/utils";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";

const trainerApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllTrainers: builder.query({
            query: (query) => {
                const params = buildQueryParams(query);
                return {
                    url: "/admin/trainers",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [tagTypes.trainer],
        }),

        updateTrainerProfileStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/trainers/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: [tagTypes.trainer],
        }),

    }),
});

export const {
    useGetAllTrainersQuery,
    useUpdateTrainerProfileStatusMutation,
} = trainerApis;
