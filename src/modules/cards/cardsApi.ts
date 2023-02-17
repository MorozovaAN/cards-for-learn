import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from 'common/constants/base-URL'

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  tagTypes: ['cards'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseURL}/cards/`,
    credentials: 'include',
  }),

  endpoints: build => ({
    getCards: build.query<GetCardsResponseType, GetCardsRequestType>({
      query: arg => ({
        url: `card`,
        params: {
          ...arg,
        },
      }),
      providesTags: result => ['cards'],
    }),
  }),
})
export const { useGetCardsQuery } = cardsApi

//types
type GetCardsResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packCreated: string
  packName: string
  packPrivate: boolean
  packUpdated: string
  packUserId: string
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}
type GetCardsRequestType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  sortCards?: string
  page?: number
  pageCount?: number
}
type CardType = {
  answer: string
  cardsPack_id: string
  comments: string
  created: string
  grade: number
  more_id: string
  question: string
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  __v: number
  _id: string
}
