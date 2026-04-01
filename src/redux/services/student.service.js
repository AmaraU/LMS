import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../config";

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Student"],
    endpoints: (builder) => ({

        getAllStudents: builder.query({
            query: () => ({
                url: `/api/students`,
                method: "GET",
            }),
        }),

        getAllEnrollableCoursesAdmin: builder.query({
            query: (student_id) => ({
                url: `/api/courses-not/${student_id}`,
                method: "GET",
            }),
        }),

        getAllEnrollableCourses: builder.query({
            query: (data) => ({
                url: `/api/courses-not/${data.student_id}/${data.instructor_id}`,
                method: "GET",
            }),
        }),

        getAllUnenrollableCoursesAdmin: builder.query({
            query: (student_id) => ({
                url: `/api/courses/${student_id}`,
                method: "GET",
            }),
        }),

        getAllUnenrollableCourses: builder.query({
            query: (data) => ({
                url: `/api/coursesss/${data.student_id}/${data.instructor_id}`,
                method: "GET",
            }),
        }),

        enrollStudent: builder.mutation({
            query: (body) => ({
                url: "/api/enroll-student",
                method: "POST",
                body,
            }),
        }),

        unenrollStudent: builder.mutation({
            query: (body) => ({
                url: "/api/enroll-student",
                method: "POST",
                body,
            }),
        }),

    }),
});

export const {
    useGetAllStudentsQuery,
    useLazyGetAllEnrollableCoursesAdmin,
    useLazyGetAllEnrollableCourses,
    useLazyGetAllUnenrollableCoursesAdmin,
    useLazyGetAllUnenrollableCourses,
    useEnrollStudentMutation,
    useUnenrollStudentMutation,
} = studentApi;