import { RootStateType } from 'store/store'

export const cardIdSelector = (state: RootStateType) => state.cards.cardId
export const questionTypeSelector = (state: RootStateType) => state.cards.questionType
export const questionTextSelector = (state: RootStateType) => state.cards.questionText
export const questionImgSelector = (state: RootStateType) => state.cards.questionImg
export const answerSelector = (state: RootStateType) => state.cards.answer
