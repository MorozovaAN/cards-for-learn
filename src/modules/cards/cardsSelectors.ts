import { RootStateType } from 'store/store'

export const cardIdSelector = (state: RootStateType) => state.cards.cardId
export const questionTypeSelector = (state: RootStateType) => state.cards.question.type
export const questionContentSelector = (state: RootStateType) => state.cards.question.content
export const answerSelector = (state: RootStateType) => state.cards.answer
