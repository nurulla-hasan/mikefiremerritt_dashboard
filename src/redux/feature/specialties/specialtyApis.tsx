
import { buildQueryParams } from "@/lib/utils";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";

const specialtyApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllSpecialties: builder.query({
            query: (query) => {
                const params = buildQueryParams(query);
                return {
                    url: "/specialties/all-specialties",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [tagTypes.specialty],
        }),

        createSpecialty: builder.mutation({
            query: (data) => ({
                url: "/specialties",
                method: "POST",
                body: data,
            }),
            invalidatesTags: [tagTypes.specialty],
        }),

        updateSpecialty: builder.mutation({
            query: ({ id, data }) => ({
                url: `/specialties/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: [tagTypes.specialty],
        }),

        deleteSpecialty: builder.mutation({
            query: (id) => ({
                url: `/specialties/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.specialty],
        }),

    }),
});

export const {
    useGetAllSpecialtiesQuery,
    useCreateSpecialtyMutation,
    useUpdateSpecialtyMutation,
    useDeleteSpecialtyMutation,
} = specialtyApis;

