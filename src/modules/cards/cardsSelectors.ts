import { RootStateType } from 'store/store'

export const cardIdSelector = (state: RootStateType) => state.cards.cardId
export const questionSelector = (state: RootStateType) => state.cards.question
export const answerSelector = (state: RootStateType) => state.cards.answer
