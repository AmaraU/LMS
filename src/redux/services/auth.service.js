import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../config";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (body) => (
                console.log(body), {
                    url: "/login",
                    method: "POST",
                    // headers: {
                    //     "Content-Type": "application/json",
                    // },
                    body: body,
                }),
        }),

        adminLogin: builder.mutation({
            query: (body) => ({
                url: "/adminlogin",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            }),
        }),

        academyLogin: builder.mutation({
            query: (body) => ({
                url: "academy-login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            }),
        }),

        resetPassword: builder.mutation({
            query: (body) => ({
                url: "reset-password",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            }),
        }),

        changePassword: builder.mutation({
            query: (body) => ({
                url: "change-password",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useAdminLoginMutation,
    useAcademyLoginMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
} = authApi;