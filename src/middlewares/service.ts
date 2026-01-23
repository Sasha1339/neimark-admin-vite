import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  APPWRITE_DATABASE_API_V1, COLLECTION_CONCIERGE_REQUESTS_ID, COLLECTION_CONVERSIONS_ID, COLLECTION_MESSAGES_ID,
  DATABASE_NEIMARK_ID,
  PROJECT_ID
} from "@/shared/const.ts";
import {Query} from "appwrite";
import type {Response} from "@/shared/types.ts";
import {type Chat, type MessageModel, type ServiceModel, ServiceType} from "@/shared/services/types.ts";

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APPWRITE_DATABASE_API_V1,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('X-Appwrite-Project', PROJECT_ID);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllServicesByType: builder.mutation<Response<ServiceModel>, { type: ServiceType }>({
      query: (params) => {

        const queries = [
          Query.limit(50),
          Query.offset(0),
          Query.orderDesc("$createdAt"),
          Query.select(["*"]),
          Query.equal("service_type", params.type)
        ];

        const queryString = queries
          .map((query, index) => `queries[${index}]=${encodeURIComponent(query)}`)
          .join('&');

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_CONCIERGE_REQUESTS_ID}/documents?${queryString}`,
          method: 'GET',
        }
      }
    }),
    getAllMessagesByChat: builder.mutation<Response<MessageModel>, { chatId: string }>({
      query: (params) => {

        const queries = [
          Query.limit(50),
          Query.offset(0),
          Query.orderDesc("$createdAt"),
          Query.select(["*"]),
          Query.equal("conversation_id", params.chatId)
        ];

        const queryString = queries
          .map((query, index) => `queries[${index}]=${encodeURIComponent(query)}`)
          .join('&');

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_MESSAGES_ID}/documents?${queryString}`,
          method: 'GET',
        }
      }
    }),
    getChat: builder.mutation<Chat, { chatId: string }>({
      query: (params) => {

        return {
          url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_CONVERSIONS_ID}/documents/${params.chatId}`,
          method: 'GET',
        }
      }
    }),
  })
});

export const {
  useGetAllMessagesByChatMutation,
  useGetAllServicesByTypeMutation,
  useGetChatMutation
} = serviceApi