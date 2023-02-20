import React, { FC, useState } from 'react'

import s from './Modals.module.scss'

import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useUpdateCardMutation } from 'modules/cards/cardsApi'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'

type UpdateCardModalProps = {
  answer: string
  question: string
}
export const UpdateCardModal: FC<UpdateCardModalProps> = ({ answer, question }) => {
  const cardId = useTypedSelector(state => state.cards.cardId)
  const [updateCard] = useUpdateCardMutation()

  const [questionValue, setQuestionValue] = useState<string>(question)
  const [answerValue, setAnswerValue] = useState<string>(answer)

  const editCardHandler = () => {
    updateCard({ card: { _id: cardId, question: questionValue, answer: answerValue } })
  }

  const changeQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuestionValue(e.currentTarget.value)
  const changeAnswerHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAnswerValue(e.currentTarget.value)

  return (
    <>
      <Input
        autoFocus
        value={questionValue}
        onChange={changeQuestionHandler}
        type="text"
        label="Question"
        error={!questionValue.length ? 'write your question' : ''}
      />
      <Input
        value={answerValue}
        onChange={changeAnswerHandler}
        type="text"
        label="Answer"
        className={s.input}
      />
      <Button onClick={editCardHandler} disabled={!questionValue} styleType="primary">
        Edit
      </Button>
    </>
  )
}
