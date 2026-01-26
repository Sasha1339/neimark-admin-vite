import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  APPWRITE_DATABASE_API_V1,
  COLLECTION_CONCIERGE_REQUESTS_ID,
  COLLECTION_CONVERSIONS_ID,
  COLLECTION_MESSAGES_ID,
  DATABASE_NEIMARK_ID,
  PROJECT_ID
} from "@/shared/const.ts";
import {Query} from "appwrite";
import type {Response} from "@/shared/types.ts";
import {
  type Chat,
  type MessageForm,
  type MessageModel,
  type ServiceModel, ServiceStatus,
  ServiceType
} from "@/shared/services/types.ts";

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
    getAllServicesByTypeWithPagination: builder.mutation<Response<ServiceModel>, { type: ServiceType, offset: number }>({
      query: (params) => {

        const queries = [
          Query.limit(50),
          Query.offset(params.offset),
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
          Query.orderAsc("$createdAt"),
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
    getAllMessagesByChatWithPagination: builder.mutation<Response<MessageModel>, { chatId: string; offset: number }>({
      query: (params) => {

        const queries = [
          Query.limit(50),
          Query.offset(params.offset),
          Query.orderAsc("$createdAt"),
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
    createMessage: builder.mutation<MessageModel, { messageId: string, message: MessageForm }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_MESSAGES_ID}/documents`,
        method: 'POST',
        body: {data: params.message, documentId: params.messageId},
      })
    }),
    updateStatusServiceById: builder.mutation<ServiceModel, { serviceId: string, status: ServiceStatus }>({
      query: (params) => ({
        url: `/${DATABASE_NEIMARK_ID}/collections/${COLLECTION_CONCIERGE_REQUESTS_ID}/documents/${params.serviceId}`,
        method: 'PATCH',
        body: {data: {status: params.status}},
      })
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
  useGetAllServicesByTypeWithPaginationMutation,
  useGetAllMessagesByChatWithPaginationMutation,
  useUpdateStatusServiceByIdMutation,
  useGetAllServicesByTypeMutation,
  useCreateMessageMutation,
  useGetChatMutation
} = serviceApi