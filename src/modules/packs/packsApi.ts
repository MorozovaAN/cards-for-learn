import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from 'common/constants/base-URL'
import { BaseQueryParamsType } from 'common/constants/baseQueryParams'

export const packsApi = createApi({
  reducerPath: 'packsApi',
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
    }),
  }),
})
export const { useGetPacksQuery } = packsApi

//types

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
