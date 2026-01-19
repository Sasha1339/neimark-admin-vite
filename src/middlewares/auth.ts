import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {APPWRITE_API, PROJECT_ID} from "@/shared/const.ts";
import type {SignInData} from "@/shared/user/types.ts";

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: APPWRITE_API,
    prepareHeaders: (headers) => {
      headers.set('X-Appwrite-Project', PROJECT_ID);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    auth: builder.mutation<any, SignInData>({
      query: (signin) => ({
        url: `/account/sessions/email`,
        method: 'POST',
        body: signin,
      })
    })
  })
});

export const { useAuthMutation } = authApi