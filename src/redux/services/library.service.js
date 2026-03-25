import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../config";

export const libraryApi = createApi({
    reducerPath: "libraryApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Library"],
    endpoints: (builder) => ({

        getAllLibraries: builder.query({
            query: () => ({
                url: `/api/library`,
                method: "GET",
            }),
        }),

        getLibraryById: builder.query({
            query: (id) => ({
                url: `/api/library-by-id/${id}`,
                method: "GET",
            }),
        }),

        getLibrariesForIntructor: builder.query({
            query: (id) => ({
                url: `/api/library-for-instructor/${id}`,
                method: "GET",
            }),
        }),

        getLibraryByIdForInstructor: builder.query({
            query: ({ instructor_id, library_id }) => ({
                url: `/api/library-by-id-for-instructor/${instructor_id}/${library_id}`,
                method: "GET",
            }),
        }),

        createLibrary: builder.mutation({
            query: (body) => ({
                url: "/api/new-library",
                method: "POST",
                body: body,
            }),
        }),

        editLibrary: builder.mutation({
            query: (body) => (
                console.log(body), {
                    url: "/api/library-info",
                    method: "POST",
                    body: body,
                }),
        }),

        deleteLibrary: builder.mutation({
            query: (body) => (
                console.log(body), {
                    url: "/api/delete-library",
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body,
                }),
        }),

        addDocument: builder.mutation({
            query: (body) => ({
                url: "/api/change-password",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body,
            }),
        }),

        removeDocument: builder.mutation({
            query: (body) => (
                console.log(body), {
                    url: "/api/delete-library-file",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body,
                }),
        }),

        getDocument: builder.query({
            query: (file_id) => ({
                url: `/api/library-doc/${file_id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAllLibrariesQuery,
    useLazyGetAllLibrariesQuery,
    useGetLibraryByIdQuery,
    useLazyGetLibraryByIdQuery,
    useGetLibrariesForIntructorQuery,
    useLazyGetLibrariesForIntructorQuery,
    useGetLibraryByIdForInstructorQuery,
    useLazyGetLibraryByIdForInstructorQuery,
    useCreateLibraryMutation,
    useEditLibraryMutation,
    useDeleteLibraryMutation,
    useAddDocumentMutation,
    useRemoveDocumentMutation,
    useGetDocumentQuery,
    useLazyGetDocumentQuery,
} = libraryApi;