import React, { ChangeEvent, useState } from 'react'

import s from './UpdateCardModule.module.scss'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useUpdateCardMutation } from 'modules/cards/cardsApi'
import { answerSelector, cardIdSelector, questionSelector } from 'modules/cards/cardsSelectors'
import { Button } from 'UI/button/Button'
import { Textarea } from 'UI/textarea/Textarea'

export const UpdateCardModal = () => {
  const cardId = useTypedSelector(cardIdSelector)
  const question = useTypedSelector(questionSelector)
  const answer = useTypedSelector(answerSelector)
  const [updateCard, { isLoading }] = useUpdateCardMutation()
  const dispatch = useTypedDispatch()

  const [questionValue, setQuestionValue] = useState<string>(question)
  const [answerValue, setAnswerValue] = useState<string>(answer)

  const editCardHandler = async () => {
    await updateCard({ card: { _id: cardId, question: questionValue, answer: answerValue } })
    dispatch(setModal({ open: false, type: '' }))
  }

  const changeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setQuestionValue(e.currentTarget.value)

  const changeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setAnswerValue(e.currentTarget.value)

  return (
    <>
      <Textarea autoFocus value={questionValue} onChange={changeQuestionHandler} label="Question" />
      {/*  error={!questionValue.length && 'write your question'}*/}

      <Textarea autoFocus value={answerValue} onChange={changeAnswerHandler} label="Answer" />

      <Button
        className={s.button}
        onClick={editCardHandler}
        disabled={!questionValue || isLoading}
        styleType="primary"
      >
        Save
      </Button>
    </>
  )
}
