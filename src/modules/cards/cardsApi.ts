import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from 'common/constants/base-URL'
import { errorHandler } from 'common/utils/errorHandler'
import { setPackInfo } from 'modules/packs/packsSlise'

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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled
          const { packName, packPrivate } = res.data

          dispatch(setPackInfo({ packName, privatePack: packPrivate }))
        } catch (err) {
          errorHandler(err, dispatch)
        }
      },
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

    updateCardGrade: build.mutation<ResponseUpdateCardGrade, RequestUpdateCardGrade>({
      query: body => ({
        url: 'grade',
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const {
  useGetCardsQuery,
  useAddNewCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useUpdateCardGradeMutation,
} = cardsApi

//types
export type GetCardsResponseType = {
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

export type CardType = {
  answer: string
  cardsPack_id: string
  comments: string
  created: string
  grade: number
  more_id: string
  question: string
  questionImg: string
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
    questionImg?: string
  }
}
export type ResponseUpdateCardGrade = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
  }
}
export type RequestUpdateCardGrade = {
  grade: number
  card_id: string
}
