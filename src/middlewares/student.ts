import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  APPWRITE_DATABASE_API_V1, COLLECTION_PROFILES_ID,
  DATABASE_NEIMARK_ID,
  PROJECT_ID
} from "@/shared/const.ts";
import {Query} from "appwrite";
import type {Response} from "@/shared/types.ts";
import type {Student, StudentForm} from "@/shared/students/types.ts";
import type {Publication} from "@/shared/publications/types.ts";

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APPWRITE_DATABASE_API_V1,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('X-Appwrite-Project', PROJECT_ID);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllStudents: builder.mutation<Response<Student>, void>({
      query: () => {

        const queries = [
          Query.limit(50),
          Query.offset(0),
          Query.orderDesc("full_name"),
          Query.select(["*"]),
          Query.equal("user_role", "student")
        ];

        const queryString = queries
          .map((query, index) => `queries[${index}]=${encodeURIComponent(query)}`)
          .join('&');

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILES_ID}/documents?${queryString}`,
          method: 'GET',
        }
      }
    }),
    getAllStudentsWithPagination: builder.mutation<Response<Student>, { offset: number }>({
      query: (params) => {

        const queries = [
          Query.limit(50),
          Query.offset(params.offset),
          Query.orderDesc("$updatedAt"),
          Query.select(["*"]),
          Query.equal("user_role", "student")
        ];

        const queryString = queries
          .map((query, index) => `queries[${index}]=${encodeURIComponent(query)}`)
          .join('&');

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILES_ID}/documents?${queryString}`,
          method: 'GET',
        }
      }
    }),
    getStudent: builder.mutation<Student, { studentId: string }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILES_ID}/documents/${params.studentId}`,
        method: 'GET',
      })
    }),
    updatePublicationFields: builder.mutation<Publication, { studentId: string, student: StudentForm }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILES_ID}/documents/${params.studentId}`,
        method: 'PATCH',
        body: {data: params.student},
      })
    }),
    createStudent: builder.mutation<Student, { studentId: string, student: StudentForm }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILES_ID}/documents`,
        method: 'POST',
        body: {data: params.student, documentId: params.studentId},
      })
    }),
    deleteStudent: builder.mutation<Student, { id: string }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILES_ID}/documents/${params.id}`,
        method: 'DELETE',
      })
    })
  })
});

export const {
  useGetAllStudentsWithPaginationMutation,
  useGetAllStudentsMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useUpdatePublicationFieldsMutation,
  useGetStudentMutation
} = studentApi