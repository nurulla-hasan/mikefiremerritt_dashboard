
import { tagTypes } from "../../tagTypes";
import { baseApi } from "../baseApi";

export const adminApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: (params) => ({
        url: "/admin/all-admins",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.admin],
    }),
    addNewAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/add-new-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/all-admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useLazyGetAllAdminsQuery,
  useAddNewAdminMutation,
  useDeleteAdminMutation,
} = adminApis;
