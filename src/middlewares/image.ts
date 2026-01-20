import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APPWRITE_STORAGE_API_V1, BUCKET_NEWS_MEDIA_ID, PROJECT_ID} from "@/shared/const.ts";
import type {ImageResponse} from "@/shared/images/types.ts";

export const imageApi = createApi({
  reducerPath: 'imageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APPWRITE_STORAGE_API_V1,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('X-Appwrite-Project', PROJECT_ID);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    savePublicationImage: builder.mutation<ImageResponse, FormData>({
      query: (formData) => ({
        url: `/buckets/${BUCKET_NEWS_MEDIA_ID}/files`,
        method: 'POST',
        body: formData
      })
    }),
    deletePublicationImage: builder.mutation<{status: string}, {fileId :string}>({
      query: (params) => ({
        url: `/buckets/${BUCKET_NEWS_MEDIA_ID}/files/${params.fileId}`,
        method: 'DELETE',
      })
    })
  })
});

export const { useSavePublicationImageMutation, useDeletePublicationImageMutation } = imageApi;

//68f655900004df150d8b