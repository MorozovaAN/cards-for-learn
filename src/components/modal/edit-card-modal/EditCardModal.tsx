import React, { ChangeEvent, useState } from 'react'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import s from 'components/modal/edit-card-modal/EditCardModule.module.scss'
import { useUpdateCardMutation } from 'modules/cards/cardsApi'
import { answerSelector, cardIdSelector, questionSelector } from 'modules/cards/cardsSelectors'
import { Button } from 'UI/button/Button'
import { Textarea } from 'UI/textarea/Textarea'

export const EditCardModal = () => {
  const [updateCard, { isLoading }] = useUpdateCardMutation()
  const cardId = useTypedSelector(cardIdSelector)
  const question = useTypedSelector(questionSelector)
  const answer = useTypedSelector(answerSelector)
  const [questionValue, setQuestionValue] = useState(question)
  const [answerValue, setAnswerValue] = useState(answer)
  const dispatch = useTypedDispatch()

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
      <Textarea
        autoFocus
        value={questionValue}
        onChange={changeQuestionHandler}
        error={!questionValue.length ? 'Write your question' : ''}
        label="Question"
      />

      <Textarea
        autoFocus
        value={answerValue}
        onChange={changeAnswerHandler}
        error={!answerValue.length ? 'Write your answer' : ''}
        label="Answer"
      />

      <Button
        className={s.button}
        onClick={editCardHandler}
        disabled={!questionValue || !answerValue || isLoading}
        styleType="primary"
      >
        Save
      </Button>
    </>
  )
}
