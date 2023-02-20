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
          pageCount: '6',
          ...arg,
        },
      }),
      providesTags: result => ['cards'],
    }),
    deleteCard: build.mutation({
      query: arg => ({
        method: 'DELETE',
        url: `card`,
        params: {
          id: arg,
        },
      }),
      invalidatesTags: ['cards'],
    }),
    addNewCard: build.mutation<ResponseNewCardType, RequestNewCardType>({
      query: body => ({
        url: 'card',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'cards' }],
    }),
    updateCard: build.mutation<ResponseUpdateCardType, RequestUpdateCardType>({
      query: body => ({
        url: 'card',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'cards' }],
    }),
  }),
})

export const {
  useGetCardsQuery,
  useAddNewCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardsApi

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
export type GetCardsRequestType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id?: string
  min?: string
  sortCards?: string
  page?: string
  pageCount?: string
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
export type ResponseNewCardType = {
  newCard: CardType
}
export type RequestNewCardType = {
  card: {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
  }
}
export type ResponseUpdateCardType = {
  updatedCard: CardType
}

export type RequestUpdateCardType = {
  card: {
    _id: string
    question: string
    answer: string
  }
}
