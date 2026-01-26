import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APPWRITE_ACCOUNT_API_V1, PROJECT_ID} from "@/shared/const.ts";
import type {User} from "@/shared/user/types.ts";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APPWRITE_ACCOUNT_API_V1,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('X-Appwrite-Project', PROJECT_ID);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getUser: builder.mutation<User, void>({
      query: () => ({
        url: ``,
        method: 'GET',
      })
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `/sessions/current`,
        method: 'DELETE',
      })
    })
  })
});

export const { useGetUserMutation, useLogoutMutation } = userApi