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
    setCardId: (state, action: PayloadAction<string>) => {
      state.cardId = action.payload
    },
    setCardQuestion: (state, action: PayloadAction<string>) => {
      state.question = action.payload
    },
    setCardAnswer: (state, action: PayloadAction<string>) => {
      state.answer = action.payload
    },
  },
})

export const { setCardId, setCardQuestion, setCardAnswer } = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
