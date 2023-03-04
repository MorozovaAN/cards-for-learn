import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from 'common/constants/base-URL'
import { BaseQueryParamsType } from 'common/constants/baseQueryParams'
import { sortingPacksMethods } from 'common/constants/sortingMethods'
import { errorHandler } from 'common/utils/errorHandler'

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
          pageCount: arg.user_id ? '5' : '6',
          min: arg.user_id ? '0' : '5',
          sortPacks: arg.user_id
            ? sortingPacksMethods.desUpdate
            : sortingPacksMethods.desCardsCount,
          ...arg,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err) {
          errorHandler(err, dispatch)
        }
      },
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
          errorHandler(err, dispatch)
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err) {
          errorHandler(err, dispatch)
        }
      },
      invalidatesTags: [{ type: 'packs', id: 'LIST' }],
    }),

    deletePack: build.mutation<ResponseDeletePackType, string>({
      query: packId => ({
        url: `/pack?id=${packId}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (err) {
          errorHandler(err, dispatch)
        }
      },
      invalidatesTags: [{ type: 'packs', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetPacksQuery,
  useAddPackMutation,
  useUpdatePackMutation,
  useDeletePackMutation,
} = packsApi

//types
export type PackType = {
  _id: string
  user_id: string
  user_name: string
  name: string
  cardsCount: number
  created: string
  updated: string
  private: boolean
}

export type ResponsePacksType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
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

export type ResponseDeletePackType = {
  deletedCardsPack: PackType
}
