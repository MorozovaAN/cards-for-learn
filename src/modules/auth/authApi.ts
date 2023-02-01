import { FetchArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type CustomizedFetchBaseQueryError = {
  data: dataType
  status: number
}

type dataType = {
  error: string
  in: string
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://neko-back.herokuapp.com/2.0/auth/',
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomizedFetchBaseQueryError, {}>,
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
