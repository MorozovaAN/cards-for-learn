import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  cardId: '',
  question: '',
  answer: '',
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardInfo: (
      state,
      action: PayloadAction<{ idCard: string; question: string; answer: string }>
    ) => {
      state.cardId = action.payload.idCard
      state.question = action.payload.question
      state.answer = action.payload.answer
    },
  },
})

export const { setCardInfo } = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
