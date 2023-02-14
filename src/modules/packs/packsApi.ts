import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { setIsLoading, setNotification } from 'app/appSlice'
import { baseURL } from 'common/constants/base-URL'
import { BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { ErrorType } from 'common/types/types'

export const packsApi = createApi({
  reducerPath: 'packsApi',
  tagTypes: ['packs'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/cards/`,
    credentials: 'include',
  }),

  endpoints: build => ({
    getPacks: build.query<ResponsePacksType, BaseQueryParamsType>({
      query: arg => ({
        url: `pack`,
        params: {
          ...arg,
        },
      }),
      providesTags: result =>
        result
          ? [
              ...result.cardPacks.map(({ _id }) => ({ type: 'packs' as const, _id })),
              { type: 'packs', id: 'LIST' },
            ]
          : [{ type: 'packs', id: 'LIST' }],
    }),
    addPack: build.mutation<ResponseNewPack, AddPackType>({
      query: body => ({
        url: 'pack',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err) {
          if ((err as ErrorType)?.error?.data?.error) {
            dispatch(setNotification({ message: 'Incorrect email or password', type: 'error' }))
          } else {
            dispatch(setNotification({ message: 'Something went wrong', type: 'error' }))
          }
        } finally {
          dispatch(setIsLoading(false))
        }
      },
      invalidatesTags: [{ type: 'packs', id: 'LIST' }],
    }),
    updatePack: build.mutation<ResponseUpdateNamePack, UpdateNamePackType>({
      query: body => ({
        url: 'pack',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'packs', id: 'LIST' }],
    }),
  }),
})
export const { useGetPacksQuery, useAddPackMutation, useUpdatePackMutation } = packsApi

//types
export type PackType = {
  _id: string
  user_id: string
  user_name: string
  name: string
  cardsCount: number
  created: string
  updated: string
}

export type ResponsePacksType = {
  cardPacks: ResponsePackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

export type ResponsePackType = {
  _id: string
  user_id: string
  user_name: string
  name: string
  cardsCount: number
  created: string
  updated: string
}

export type UpdateNamePackType = {
  cardsPack: {
    _id: string
    name: string
    private: boolean
  }
}

export type AddPackType = {
  cardsPack: {
    name: string
    deckCover: string
    private: boolean
  }
}

export type ResponseUpdateNamePack = {
  updatedCardsPack: PackType
}

export type ResponseNewPack = {
  newCardsPack: PackType
}
