import { buildQueryParams } from "@/lib/utils";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";

const productsApis = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllProducts: builder.query({
            query: (query) => {
                const params = buildQueryParams(query);
                return {
                    url: "/admin/products",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: [tagTypes.product],
        }),

        updateProductStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/products/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: [tagTypes.product],
        }),

    }),
});

export const {
    useGetAllProductsQuery,
    useLazyGetAllProductsQuery,
    useUpdateProductStatusMutation,
} = productsApis;
