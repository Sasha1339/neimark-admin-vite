import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  APPWRITE_API_V1,
  APPWRITE_DATABASE_API_V1,
  COLLECTION_PUBLICATION_ID,
  DATABASE_NEIMARK_ID,
  PROJECT_ID
} from "@/shared/const.ts";
import type {Publication, PublicationForm, PublicationsResponse} from "@/shared/publications/types.ts";
import {Query, TablesDB} from "appwrite";

export const publicationApi = createApi({
  reducerPath: 'publicationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APPWRITE_DATABASE_API_V1,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('X-Appwrite-Project', PROJECT_ID);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllPublications: builder.mutation<PublicationsResponse, void>({
      query: () => {

        const queries = [
          Query.limit(50),
          Query.offset(0),
          Query.orderDesc("$updatedAt"),
          Query.select(["*"]),
        ];

        const queryString = queries
          .map((query, index) => `queries[${index}]=${encodeURIComponent(query)}`)
          .join('&');

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PUBLICATION_ID}/documents?${queryString}`,
          method: 'GET',
        }
      }
    }),
    getAllPublicationsWithPagination: builder.mutation<PublicationsResponse, { offset: number }>({
      query: (params) => {

        const queries = [
          Query.limit(50),
          Query.offset(params.offset),
          Query.orderDesc("$updatedAt"),
          Query.select(["*"]),
        ];

        const queryString = queries
          .map((query, index) => `queries[${index}]=${encodeURIComponent(query)}`)
          .join('&');

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PUBLICATION_ID}/documents?${queryString}`,
          method: 'GET',
        }
      }
    }),
    getPublication: builder.mutation<Publication, { publicationId: string }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PUBLICATION_ID}/documents/${params.publicationId}`,
        method: 'GET',
      })
    }),
    updatePublicationFields: builder.mutation<Publication, { publicationId: string, publication: PublicationForm }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PUBLICATION_ID}/documents/${params.publicationId}`,
        method: 'PATCH',
        body: {data: params.publication},
      })
    }),
    createPublication: builder.mutation<Publication, { publicationId: string, publication: PublicationForm }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PUBLICATION_ID}/documents`,
        method: 'POST',
        body: {data: params.publication, documentId: params.publicationId},
      })
    }),
    deletePublication: builder.mutation<Publication, { id: string }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PUBLICATION_ID}/documents/${params.id}`,
        method: 'DELETE',
      })
    })
  })
});

export const {
  useGetAllPublicationsMutation,
  useGetAllPublicationsWithPaginationMutation,
  useGetPublicationMutation,
  useUpdatePublicationFieldsMutation,
  useCreatePublicationMutation,
  useDeletePublicationMutation
} = publicationApi