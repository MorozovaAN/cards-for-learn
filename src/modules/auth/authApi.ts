import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export type LogInDataType = {
  email: string
  password: string
  rememberMe: boolean
}

type LogUpDataType = Pick<LogInDataType, 'email' | 'password'>

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
  }),

  endpoints: build => ({
    me: build.mutation<Response, {}>({
      query: () => ({
        url: `me`,
        method: 'POST',
      }),
    }),
    logUp: build.mutation<Response, LogUpDataType>({
      query: logUpData => ({
        url: 'register',
        method: 'POST',
        body: logUpData,
      }),
    }),
    login: build.mutation<Response, LogInDataType>({
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
      query: UpdateProfile => ({
        url: 'me',
        method: 'PUT',
        body: UpdateProfile,
      }),
    }),
  }),
})

export const {
  useMeMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useLogUpMutation,
} = authApi
