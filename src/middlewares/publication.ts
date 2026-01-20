import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  APPWRITE_API_V1,
  APPWRITE_DATABASE_API_V1,
  COLLECTION_PUBLICATION_ID,
  DATABASE_NEIMARK_ID,
  PROJECT_ID
} from "@/shared/const.ts";
import type {Publication, PublicationForm, PublicationsResponse} from "@/shared/publications/types.ts";

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
      query: () => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_PUBLICATION_ID}/documents`,
        method: 'GET',
      })
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
    })
  })
});

export const {
  useGetAllPublicationsMutation,
  useGetPublicationMutation,
  useUpdatePublicationFieldsMutation
} = publicationApi