
import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

const settingsApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/privacy-policy",
        method: "GET",
      }),
      providesTags: [tagTypes.privacy],
    }),
    updatePrivacyPolicy: builder.mutation({
      query: ({ id, data }) => ({
        url: `/privacy-policy/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: [tagTypes.privacy],
    }),
    getTermsConditions: builder.query({
      query: () => ({
        url: "/terms-&-conditions",
        method: "GET",
      }),
      providesTags: [tagTypes.terms],
    }),
    updateTermsConditions: builder.mutation({
      query: ({ id, data }) => ({
        url: `/terms-&-conditions/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: [tagTypes.terms],
    }),
    getDisclimer: builder.query({
      query: () => ({
        url: "/disclaimer",
        method: "GET",
      }),
      providesTags: [tagTypes.about],
    }),
    updateDisclaimer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/disclaimer/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: [tagTypes.about],
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: "/about-us",
        method: "GET",
      }),
      providesTags: [tagTypes.about],
    }),
    updateAboutUs: builder.mutation({
      query: ({ id, data }) => ({
        url: `/about-us/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: [tagTypes.about],
    }),
    getContactUsInfo: builder.query({
      query: () => ({
        url: "/contact-us-info",
        method: "GET",
      }),
      providesTags: [tagTypes.contact],
    }),
    updateContactUsInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contact-us-info/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.contact],
    }),
  }),
});

export const {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
  useGetDisclimerQuery,
  useUpdateDisclaimerMutation,
  useGetContactUsInfoQuery,
  useUpdateContactUsInfoMutation,
} = settingsApis;
