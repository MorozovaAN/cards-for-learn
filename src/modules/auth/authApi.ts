import { FetchArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type CustomizedError = {
  data: {
    error: string
    in: string
  }
  status: number
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://neko-back.herokuapp.com/2.0/auth/',
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomizedError, {}>,

  endpoints: build => ({
    me: build.mutation({
      query: ({}) => ({
        url: `me`,
        method: 'POST',
      }),
    }),
  }),
})

export const { useMeMutation } = authApi
