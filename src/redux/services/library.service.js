import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../config";

export const libraryApi = createApi({
    reducerPath: "libraryApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Library"],
    endpoints: (builder) => ({

        getAllLibraries: builder.query({
            query: () => ({
                url: `library`,
                method: "GET",
            }),
        }),

        getLibraryById: builder.query({
            query: (id) => ({
                url: `library-by-id/${id}`,
                method: "GET",
            }),
        }),

        getLibrariesForIntructor: builder.query({
            query: (id) => ({
                url: `library-for-instructor/${id}`,
                method: "GET",
            }),
        }),

        getLibraryByIdForInstructor: builder.query({
            query: ({ instructor_id, library_id }) => ({
                url: `library-by-id-for-instructor/${instructor_id}/${library_id}`,
                method: "GET",
            }),
        }),

        createLibrary: builder.mutation({
            query: (body) => ({
                url: "new-library",
                method: "POST",
                body: body,
            }),
        }),

        editLibrary: builder.mutation({
            query: (body) => (
                console.log(body), {
                    url: "library-info",
                    method: "POST",
                    body: body,
                }),
        }),

        deleteLibrary: builder.mutation({
            query: (body) => (
                console.log(body), {
                    url: "delete-library",
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body,
                }),
        }),

        addDocument: builder.mutation({
            query: (body) => ({
                url: "change-password",
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
                    url: "delete-library-file",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body,
                }),
        }),

        getDocument: builder.query({
            query: (file_id) => ({
                url: `library-doc/${file_id}`,
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