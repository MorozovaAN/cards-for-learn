import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { forgotPasswordCurrentEmail } from 'modules/auth/authSlice'
import { setIsAuth, setIsLoading, setIsLoggedIn, setNotification } from 'pages/app/appSlice'
import { setAuthData } from 'modules/auth/authSlice'
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
  avatar: string
}
export type UpdateProfileType = {
  updatedUser: Response
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
          const res = await queryFulfilled

          dispatch(setIsLoggedIn(true))
          dispatch(setAuthData(res.data))
        } catch (err) {
          if ((err as ErrorType)?.error?.data?.error !== 'you are not authorized /ᐠ-ꞈ-ᐟ\\')
            dispatch(setNotification({ message: 'Something went wrong', type: 'error' }))
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
          dispatch(
            setNotification({ message: 'You have successfully registered', type: 'success' })
          )
        } catch (err) {
          const error = (err as ErrorType)?.error?.data?.error

          if (error) {
            dispatch(setNotification({ message: error, type: 'error' }))
          } else {
            dispatch(setNotification({ message: 'Something went wrong', type: 'error' }))
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
          const res = await queryFulfilled

          dispatch(setIsLoggedIn(true))
          dispatch(setAuthData(res.data))
        } catch (err) {
          if ((err as ErrorType)?.error?.data?.error) {
            dispatch(setNotification({ message: 'Not correct email or password', type: 'error' }))
          } else {
            dispatch(setNotification({ message: 'Something went wrong', type: 'error' }))
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setIsLoading(true))
        try {
          await queryFulfilled
          dispatch(setIsLoggedIn(false))
        } catch (err) {
          dispatch(setError('Something went wrong'))
        } finally {
          dispatch(setIsLoading(false))
        }
      },
    }),
    updateProfile: build.mutation<UpdateProfileType, UpdateProfile>({
      query: UpdateProfile => ({
        url: 'me',
        method: 'PUT',
        body: UpdateProfile,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setIsLoading(true))
        try {
          const res = await queryFulfilled

          dispatch(setAuthData(res.data.updatedUser))
        } catch (err) {
          dispatch(setError('Something went wrong'))
        } finally {
          dispatch(setIsLoading(false))
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true))
          await queryFulfilled
          // dispatch(setIsLoggedIn(false))
        } catch (err) {
          const error = (err as ErrorType)?.error?.data?.error

          if (error) {
            dispatch(setNotification({ message: error, type: 'error' }))
          } else {
            dispatch(setNotification({ message: 'Something went wrong', type: 'error' }))
          }
        } finally {
          dispatch(setIsLoading(false))
        }
      },
    }),

    forgotPassword: build.mutation<CommonType, RequestForgotPasswordType>({
      query: body => ({
        url: 'forgot',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true))
          await queryFulfilled
          dispatch(forgotPasswordCurrentEmail(body.email))
        } catch (err) {
          const error = (err as ErrorType)?.error?.data?.error

          if (error) {
            dispatch(setNotification({ message: error, type: 'error' }))
          } else {
            dispatch(setNotification({ message: 'Something went wrong', type: 'error' }))
          }
        } finally {
          dispatch(setIsLoading(false))
        }
      },
    }),

    setNewPassword: build.mutation<CommonType, RequestSetNewPasswordType>({
      query: ({ password, resetPasswordToken }) => ({
        url: 'set-new-password',
        method: 'POST',
        body: { password, resetPasswordToken },
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          dispatch(setIsLoading(true))
          await queryFulfilled
          dispatch(setNotification({ message: 'Password changed successfully', type: 'success' }))
        } catch (err) {
          const error = (err as ErrorType)?.error?.data?.error

          if (error) {
            dispatch(setNotification({ message: error, type: 'error' }))
          } else {
            dispatch(setNotification({ message: 'Something went wrong', type: 'error' }))
          }
        } finally {
          dispatch(setIsLoading(false))
        }
      },
    }),
  }),
})

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

export type RequestForgotPasswordType = {
  email: string
  from?: string
  message: string
}

export type RequestSetNewPasswordType = {
  password: string
  resetPasswordToken: string
}

export const {
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
  useMeMutation,
  useLogInMutation,
  useLogOutMutation,
  useLogUpMutation,
} = authApi
