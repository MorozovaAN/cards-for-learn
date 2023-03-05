import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  cardId: '',
  questionType: 'Text' as QuestionTypeType,
  questionText: '',
  questionImg: '',
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
        questionType: QuestionTypeType
        questionText: string
        questionImg: string
        answer: string
      }>
    ) => {
      state.cardId = action.payload.idCard
      state.questionType = action.payload.questionType
      state.questionText = action.payload.questionText
      state.questionImg = action.payload.questionImg
      state.answer = action.payload.answer
    },
    setQuestionType: (state, action: PayloadAction<QuestionTypeType>) => {
      state.questionType = action.payload
    },
  },
})

export const { setCardInfo, setQuestionType } = cardsSlice.actions
export const cardsReducer = cardsSlice.reducer

export type QuestionTypeType = 'Text' | 'Image'
