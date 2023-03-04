import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  cardId: '',
  question: { type: '', content: '' },
  answer: '',
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardInfo: (
      state,
      action: PayloadAction<{
        idCard: string
        question: { type: string; content: string }
        answer: string
      }>
    ) => {
      state.cardId = action.payload.idCard
      state.question.type = action.payload.question.type
      state.question.content = action.payload.question.content
      state.answer = action.payload.answer
    },
    setQuestion: (state, action: PayloadAction<{ type: string; content: string }>) => {
      state.question.type = action.payload.type
      state.question.content = action.payload.content
    },
  },
})

export const { setCardInfo, setQuestion } = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer
