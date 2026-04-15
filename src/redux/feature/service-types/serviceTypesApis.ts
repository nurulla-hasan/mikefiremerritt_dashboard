import { buildQueryParams } from "@/lib/utils";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";

const serviceTypesApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServiceTypes: builder.query({
      query: (query) => {
        const params = buildQueryParams(query);
        return {
          url: "/service-types",
          method: "GET",
          params: params,
        };
      },
      providesTags: [tagTypes.serviceType],
    }),

    createServiceType: builder.mutation({
      query: (data) => ({
        url: "/service-types",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.serviceType],
    }),

    updateServiceType: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service-types/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.serviceType],
    }),

    deleteServiceType: builder.mutation({
      query: (id) => ({
        url: `/service-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.serviceType],
    }),
  }),
});

export const {
  useGetAllServiceTypesQuery,
  useCreateServiceTypeMutation,
  useUpdateServiceTypeMutation,
  useDeleteServiceTypeMutation,
} = serviceTypesApis;
