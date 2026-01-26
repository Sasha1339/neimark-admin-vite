import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APPWRITE_ACCOUNT_API_V1, PROJECT_ID} from "@/shared/const.ts";
import type {SignInData} from "@/shared/user/types.ts";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: APPWRITE_ACCOUNT_API_V1,
    prepareHeaders: (headers) => {
      headers.set('X-Appwrite-Project', PROJECT_ID);
      headers.set('Origin', 'https://cloud.appwrite.io');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    auth: builder.mutation<void, SignInData>({
      query: (signin) => ({
        url: `/sessions/email`,
        method: 'POST',
        body: signin,
      })
    })
  })
});

export const {useAuthMutation} = authApi