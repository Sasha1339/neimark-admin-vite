import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  APPWRITE_DATABASE_API_V1, COLLECTION_PROFILE_DOCUMENTS_ID, COLLECTION_PROFILES_ID,
  DATABASE_NEIMARK_ID,
  PROJECT_ID
} from "@/shared/const.ts";
import {Query} from "appwrite";
import type {Response} from "@/shared/types.ts";
import {type DocumentFile, DocumentStatus} from "@/shared/documents/types.ts";
import type {Student, StudentForm} from "@/shared/students/types.ts";
import type {Publication} from "@/shared/publications/types.ts";

export const documentApi = createApi({
  reducerPath: 'documentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APPWRITE_DATABASE_API_V1,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('X-Appwrite-Project', PROJECT_ID);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllDocumentsById: builder.mutation<Response<DocumentFile>, { profileId: string }>({
      query: (params) => {

        const queries = [
          Query.limit(50),
          Query.offset(0),
          Query.orderDesc("$updatedAt"),
          Query.select(["*"]),
          Query.equal("profile_id", params.profileId)
        ];

        const queryString = queries
          .map((query, index) => `queries[${index}]=${encodeURIComponent(query)}`)
          .join('&');

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILE_DOCUMENTS_ID}/documents?${queryString}`,
          method: 'GET',
        }
      }
    }),
    getAllDocuments: builder.mutation<Response<DocumentFile>, void>({
      query: () => {

        const queries = [
          Query.limit(50),
          Query.offset(0),
          Query.orderDesc("$updatedAt"),
          Query.select(["*"])
        ];

        const queryString = queries
          .map((query, index) => `queries[${index}]=${encodeURIComponent(query)}`)
          .join('&');

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILE_DOCUMENTS_ID}/documents?${queryString}`,
          method: 'GET',
        }
      }
    }),
    getAllDocumentsWithPagination: builder.mutation<Response<DocumentFile>, { offset: number }>({
      query: (params) => {

        const queries = [
          Query.limit(50),
          Query.offset(params.offset),
          Query.orderDesc("$updatedAt"),
          Query.select(["*"])
        ];

        const queryString = queries
          .map((query, index) => `queries[${index}]=${encodeURIComponent(query)}`)
          .join('&');

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILE_DOCUMENTS_ID}/documents?${queryString}`,
          method: 'GET',
        }
      }
    }),
    approvedDocument: builder.mutation<Publication, { documentId: string }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILE_DOCUMENTS_ID}/documents/${params.documentId}`,
        method: 'PATCH',
        body: {data: {status: DocumentStatus.APPROVED}},
      })
    }),
    rejectedDocument: builder.mutation<Publication, { documentId: string }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILE_DOCUMENTS_ID}/documents/${params.documentId}`,
        method: 'PATCH',
        body: {data: {status: DocumentStatus.REJECTED}},
      })
    }),
    expiredDocument: builder.mutation<Publication, { documentId: string }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PROFILE_DOCUMENTS_ID}/documents/${params.documentId}`,
        method: 'PATCH',
        body: {data: {status: DocumentStatus.EXPIRED}},
      })
    }),
  })
});

export const {
  useGetAllDocumentsByIdMutation,
  useGetAllDocumentsMutation,
  useGetAllDocumentsWithPaginationMutation
} = documentApi