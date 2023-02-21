import React, { KeyboardEvent, useState } from 'react'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useTypedSelector } from 'common/hooks/useTypedSelector'
import { useUpdateCardMutation } from 'modules/cards/cardsApi'
import { answerSelector, cardIdSelector, questionSelector } from 'modules/cards/cardsSelectors'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'

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

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && editCardHandler()
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
        onKeyUp={onEnterHandler}
        type="text"
        label="Question"
        error={!questionValue.length && 'write your question'}
      />
      <Input
        value={answerValue}
        onChange={changeAnswerHandler}
        type="text"
        label="Answer"
        onKeyUp={onEnterHandler}
      />
      <Button onClick={editCardHandler} disabled={!questionValue || isLoading} styleType="primary">
        Edit
      </Button>
    </>
  )
}
