import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setIsLoggedIn } from 'pages/app/appSlice'

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
    logIn: build.mutation<Response, LogInDataType>({
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(setIsLoggedIn(false))
        } catch (err) {
          console.log(err)
        }
      },
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
  useLogUpMutation,
} = authApi
