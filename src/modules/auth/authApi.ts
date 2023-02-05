import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setError, setIsAuth, setIsLoading, setIsLoggedIn, setSuccess } from 'pages/app/appSlice'

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

type ErrorType = {
  error: {
    data: {
      error: string
    }
    status: number
  }
}
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://neko-back.herokuapp.com/2.0/auth/',
    credentials: 'include',
  }),

  endpoints: build => ({
    me: build.mutation<Response, void>({
      query: () => ({
        url: `me`,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(setIsLoggedIn(true))
        } catch (err) {
          if ((err as ErrorType)?.error?.data?.error !== 'you are not authorized /ᐠ-ꞈ-ᐟ\\')
            dispatch(setError('Something went wrong'))
        } finally {
          dispatch(setIsAuth())
        }
      },
    }),
    logUp: build.mutation<Response, LogUpDataType>({
      query: logUpData => ({
        url: 'register',
        method: 'POST',
        body: logUpData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(setSuccess('You have successfully registered'))
        } catch (err) {
          const error = (err as ErrorType)?.error?.data?.error

          if (error) {
            dispatch(setError(error))
          } else {
            dispatch(setError('Something went wrong'))
          }
        } finally {
          dispatch(setIsLoading(false))
        }
      },
    }),
    logIn: build.mutation<Response, LogInDataType>({
      query: loginData => ({
        url: 'login',
        method: 'POST',
        body: loginData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          dispatch(setIsLoggedIn(true))
        } catch (err) {
          if ((err as ErrorType)?.error?.data?.error) {
            dispatch(setError('Not correct email or password'))
          } else {
            dispatch(setError('Something went wrong'))
          }
        } finally {
          dispatch(setIsLoading(false))
        }
      },
    }),
    logOut: build.mutation<CommonType, void>({
      query: () => ({
        url: 'me',
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useMeMutation, useLogInMutation, useLogOutMutation, useLogUpMutation } = authApi
