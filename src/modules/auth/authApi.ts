import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setIsAuth, setIsLoading, setIsLoggedIn, setNotification } from 'app/appSlice'
import { baseURL } from 'common/constants/base-URL'
import { ErrorType } from 'common/types/types'
import { errorHandler } from 'common/utils/errorHandler'
import { forgotPasswordCurrentEmail, setAuthData } from 'modules/auth/authSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/auth/`,
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
          errorHandler(err, dispatch)
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
            dispatch(setNotification({ message: 'Incorrect email or password', type: 'error' }))
          } else {
            const error = err as { error: { status: string } }

            dispatch(setNotification({ message: error.error.status, type: 'error' }))
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
          dispatch(setNotification({ message: 'Something went wrong', type: 'error' }))
        } finally {
          dispatch(setIsLoading(false))
        }
      },
    }),

    updateUserName: build.mutation<UpdateProfileType, string>({
      query: name => ({
        url: 'me',
        method: 'PUT',
        body: { name, avatar: '' },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled

          dispatch(setAuthData(res.data.updatedUser))
          dispatch(setNotification({ message: 'Nickname changed successfully', type: 'success' }))
        } catch (err) {
          errorHandler(err, dispatch)
        }
      },
    }),

    updateUserAvatar: build.mutation<UpdateProfileType, string>({
      query: avatar => ({
        url: 'me',
        method: 'PUT',
        body: { packName: '', avatar },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled

          dispatch(setAuthData(res.data.updatedUser))
          dispatch(
            setNotification({ message: 'Avatar image changed successfully', type: 'success' })
          )
        } catch (err) {
          dispatch(setNotification({ message: 'Sorry, max file size - 110 Kb!', type: 'error' }))
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
          errorHandler(err, dispatch)
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
          errorHandler(err, dispatch)
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

export type RequestForgotPasswordType = {
  email: string
  from?: string
  message: string
}

export type RequestSetNewPasswordType = {
  password: string
  resetPasswordToken: string
}

export type UpdateProfileType = {
  updatedUser: Response
}

export type UpdateProfile = {
  name: string
  avatar: string
}
export const {
  useForgotPasswordMutation,
  useSetNewPasswordMutation,
  useMeMutation,
  useLogInMutation,
  useLogOutMutation,
  useLogUpMutation,
  useUpdateUserNameMutation,
  useUpdateUserAvatarMutation,
} = authApi
