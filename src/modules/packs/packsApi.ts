import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from 'common/constants/base-URL'

export const packsApi = createApi({
  reducerPath: 'packsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/cards/`,
    credentials: 'include',
  }),

  endpoints: build => ({
    getPacks: build.query<ResponsePacksType, void>({
      query: () => ({
        url: `pack`,
        params: {},
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
