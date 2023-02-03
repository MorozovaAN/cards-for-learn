import { FetchArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type CustomizedError = {
  data: {
    error: string
    in: string
  }
  status: number
}

export interface Response {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: Date
  updated: Date
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
}

export type loginType = {
  email: string
  password: string
  rememberMe: boolean
}

export type CommonType = {
  info: string
  error?: string
}
export type UpdateProfile = {
  name: string
  avatar: string
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://neko-back.herokuapp.com/2.0/auth/',
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomizedError, {}>,
  tagTypes: ['UserData'],
  endpoints: build => ({
    me: build.mutation<Response, {}>({
      query: () => ({
        url: `me`,
        method: 'POST',
      }),
      invalidatesTags: ['UserData'],
    }),
    login: build.mutation<Response, loginType>({
      query: loginData => ({
        url: 'login',
        method: 'POST',
        body: loginData,
      }),
    }),
    logout: build.mutation<CommonType, void>({
      query: () => ({
        url: 'me',
        method: 'DELETE',
      }),
    }),
    updateProfile: build.mutation<Response, UpdateProfile>({
      query: UpdateName => ({
        url: 'me',
        method: 'PUT',
        body: UpdateName,
      }),
    }),
  }),
})

export const { useMeMutation, useLoginMutation, useLogoutMutation, useUpdateProfileMutation } =
  authApi
