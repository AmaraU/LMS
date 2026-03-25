import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../config";
import { useAppSelector } from "../store";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (body) => ({
                url: "/api/login",
                method: "POST",
                body: body,
            }),
        }),

        academyLogin: builder.mutation({
            query: (body) => ({
                url: "/api/academy-login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            }),
        }),

        getUserProfile: builder.mutation({
            query: (body) => (
                {
                    url: "/api/academy-user-profile",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${body?.token}`,
                        // Authorization: body.token.startsWith("Bearer")
                        //     ? body.token
                        //     : `Bearer ${body.token}`,
                    },
                    body: body?.body,
                }),
        }),

        registerFromAcademy: builder.mutation({
            query: (body) => (
                console.log(body), {
                    url: "/api/register-academy-student",
                    method: "POST",
                    body: body,
                }),
        }),

        adminLogin: builder.mutation({
            query: (body) => ({
                url: "/api/adminlogin",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            }),
        }),

        resetPassword: builder.mutation({
            query: (body) => ({
                url: "/api/reset-password",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            }),
        }),

        changePassword: builder.mutation({
            query: (body) => ({
                url: "/api/change-password",
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
    useRegisterFromAcademyMutation,
    useGetUserProfileMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
} = authApi;