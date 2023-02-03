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
export type RequestForgotPasswordType = {
  email: string
  from?: string
  message: string
}

export type RequestSetNewPasswordType = {
  password: string
  resetPasswordToken: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://neko-back.herokuapp.com/2.0/auth/',
    credentials: 'include',
    // }),
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomizedError, {}>,

  endpoints: build => ({
    me: build.mutation<Response, {}>({
      query: () => ({
        url: `me`,
        method: 'POST',
      }),
    }),
    logIn: build.mutation<Response, loginType>({
      query: body => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    logOut: build.mutation<CommonType, void>({
      query: () => ({
        url: 'me',
        method: 'DELETE',
      }),
    }),
    forgotPassword: build.mutation<CommonType, RequestForgotPasswordType>({
      query: body => ({
        url: 'forgot',
        method: 'POST',
        body,
      }),
    }),
    setNewPassword: build.mutation<CommonType, RequestSetNewPasswordType>({
      query: ({ password, resetPasswordToken }) => ({
        url: 'set-new-password',
        method: 'POST',
        body: { password, resetPasswordToken },
      }),
    }),
  }),
})

export const {
  useMeMutation,
  useLogInMutation,
  useLogOutMutation,
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
} = authApi
