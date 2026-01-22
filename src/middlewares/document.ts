import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  APPWRITE_DATABASE_API_V1, COLLECTION_PROFILE_DOCUMENTS_ID,
  DATABASE_NEIMARK_ID,
  PROJECT_ID
} from "@/shared/const.ts";
import {Query} from "appwrite";
import type {Response} from "@/shared/types.ts";
import type {DocumentFile} from "@/shared/documents/types.ts";

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
    })
  })
});

export const {
  useGetAllDocumentsByIdMutation
} = documentApi