import React, { KeyboardEvent, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import { setModal } from 'app/appSlice'
import { useTypedDispatch } from 'common/hooks/useTypedDispatch'
import { useAddNewCardMutation } from 'modules/cards/cardsApi'
import { Button } from 'UI/button/Button'
import { Input } from 'UI/input/Input'

export const AddCardModal = () => {
  const [addCard, { isLoading }] = useAddNewCardMutation()
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const dispatch = useTypedDispatch()

  const [searchParams, _] = useSearchParams()
  const id = searchParams.get('cardsPack_id')
  const addCardHandler = async () => {
    await addCard({ card: { cardsPack_id: id ? id : '', question, answer } })
    dispatch(setModal({ open: false, type: '' }))
  }
  const changeQuestionHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuestion(e.currentTarget.value)
  const changeAnswerHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAnswer(e.currentTarget.value)

  const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addCardHandler()
  }

  return (
    <>
      <select>
        <option value="0">Text</option>
        <option value="1">Select2</option>
      </select>

      <Input
        value={question}
        onChange={changeQuestionHandler}
        type="text"
        label="Question"
        autoFocus
        onKeyUp={onEnterHandler}
      />
      <Input
        value={answer}
        onChange={changeAnswerHandler}
        type="text"
        label="Answer"
        onKeyUp={onEnterHandler}
      />

      <Button disabled={!question || isLoading} styleType="primary" onClick={addCardHandler}>
        Save
      </Button>
    </>
  )
}
